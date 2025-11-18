// Inventory Link Service
// Links preference card items to inventory database

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface InventoryItem {
  id?: string;
  name: string;
  itemCode?: string;
  barcode?: string;
  category: string;
  subcategory?: string;
  manufacturer?: string;
  supplier?: string;
  unitOfMeasure: string;
  packSize?: number;
  reorderLevel?: number;
  currentStock?: number;
  location?: string;
  storageArea?: string;
  expiryDate?: string;
  cost?: number;
  lastUpdated?: string;
}

export interface PreferenceCardItemLink {
  preferenceCardId: string;
  itemName: string;
  itemType: 'equipment' | 'instrument' | 'implant' | 'consumable' | 'suture';
  inventoryItemId?: string;
  inventoryItem?: InventoryItem;
  isLinked: boolean;
  quantity?: number;
}

/**
 * Searches inventory for an item by name
 */
export async function searchInventoryByName(searchTerm: string): Promise<InventoryItem[]> {
  try {
    const inventorySnap = await getDocs(collection(db, 'inventory'));
    const items: InventoryItem[] = [];

    inventorySnap.forEach(doc => {
      const data = doc.data();
      const itemName = data.name?.toLowerCase() || '';
      const search = searchTerm.toLowerCase();

      if (itemName.includes(search) || data.itemCode?.toLowerCase().includes(search)) {
        items.push({
          id: doc.id,
          ...data
        } as InventoryItem);
      }
    });

    return items.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error searching inventory:', error);
    return [];
  }
}

/**
 * Gets inventory item by ID
 */
export async function getInventoryItemById(itemId: string): Promise<InventoryItem | null> {
  try {
    const inventorySnap = await getDocs(collection(db, 'inventory'));

    for (const docSnap of inventorySnap.docs) {
      if (docSnap.id === itemId) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as InventoryItem;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    return null;
  }
}

/**
 * Finds best matching inventory items for a preference card item name
 */
export async function findMatchingInventoryItems(
  itemName: string,
  itemType?: string
): Promise<InventoryItem[]> {
  try {
    // First try exact match
    let matches = await searchInventoryByName(itemName);

    if (matches.length > 0) {
      return matches;
    }

    // Try fuzzy matching - split item name into words
    const words = itemName.toLowerCase().split(/\s+/);
    const inventorySnap = await getDocs(collection(db, 'inventory'));
    const scoredItems: { item: InventoryItem; score: number }[] = [];

    inventorySnap.forEach(doc => {
      const data = doc.data();
      const inventoryItemName = data.name?.toLowerCase() || '';
      let score = 0;

      // Score based on word matches
      words.forEach(word => {
        if (inventoryItemName.includes(word)) {
          score += word.length; // Longer words = higher score
        }
      });

      // Bonus for category match
      if (itemType && data.category?.toLowerCase() === itemType.toLowerCase()) {
        score += 10;
      }

      if (score > 0) {
        scoredItems.push({
          item: { id: doc.id, ...data } as InventoryItem,
          score
        });
      }
    });

    // Sort by score and return top matches
    return scoredItems
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(si => si.item);
  } catch (error) {
    console.error('Error finding matching inventory items:', error);
    return [];
  }
}

/**
 * Gets all preference cards with their inventory links
 */
export async function getPreferenceCardsWithInventoryLinks(): Promise<{
  preferenceCardId: string;
  procedureName: string;
  items: PreferenceCardItemLink[];
}[]> {
  try {
    const prefsSnap = await getDocs(collection(db, 'preferenceCards'));
    const cardsWithLinks: any[] = [];

    for (const prefDoc of prefsSnap.docs) {
      const data = prefDoc.data();
      const items: PreferenceCardItemLink[] = [];

      // Process equipment
      if (data.equipment && Array.isArray(data.equipment)) {
        for (const equipName of data.equipment) {
          const matches = await findMatchingInventoryItems(equipName, 'equipment');
          items.push({
            preferenceCardId: prefDoc.id,
            itemName: equipName,
            itemType: 'equipment',
            inventoryItemId: matches[0]?.id,
            inventoryItem: matches[0],
            isLinked: matches.length > 0
          });
        }
      }

      // Process instruments
      if (data.instruments && Array.isArray(data.instruments)) {
        for (const instName of data.instruments) {
          const matches = await findMatchingInventoryItems(instName, 'instrument');
          items.push({
            preferenceCardId: prefDoc.id,
            itemName: instName,
            itemType: 'instrument',
            inventoryItemId: matches[0]?.id,
            inventoryItem: matches[0],
            isLinked: matches.length > 0
          });
        }
      }

      // Process implants
      if (data.implants && Array.isArray(data.implants)) {
        for (const implantName of data.implants) {
          const matches = await findMatchingInventoryItems(implantName, 'implant');
          items.push({
            preferenceCardId: prefDoc.id,
            itemName: implantName,
            itemType: 'implant',
            inventoryItemId: matches[0]?.id,
            inventoryItem: matches[0],
            isLinked: matches.length > 0
          });
        }
      }

      cardsWithLinks.push({
        preferenceCardId: prefDoc.id,
        procedureName: data.procedureName || 'Unknown Procedure',
        items
      });
    }

    return cardsWithLinks;
  } catch (error) {
    console.error('Error getting preference cards with inventory links:', error);
    return [];
  }
}

/**
 * Calculates inventory availability for a preference card
 */
export async function checkInventoryAvailabilityForPreferenceCard(
  preferenceCardId: string
): Promise<{
  allAvailable: boolean;
  unavailableItems: string[];
  lowStockItems: string[];
  expiringItems: string[];
}> {
  try {
    const prefSnap = await getDocs(
      query(collection(db, 'preferenceCards'), where('id', '==', preferenceCardId))
    );

    if (prefSnap.empty) {
      return {
        allAvailable: false,
        unavailableItems: [],
        lowStockItems: [],
        expiringItems: []
      };
    }

    const prefData = prefSnap.docs[0].data();
    const unavailableItems: string[] = [];
    const lowStockItems: string[] = [];
    const expiringItems: string[] = [];

    // Check all items
    const allItems = [
      ...(prefData.equipment || []),
      ...(prefData.instruments || []),
      ...(prefData.implants || [])
    ];

    for (const itemName of allItems) {
      const matches = await findMatchingInventoryItems(itemName);

      if (matches.length === 0) {
        unavailableItems.push(itemName);
        continue;
      }

      const inventoryItem = matches[0];

      // Check stock levels
      if (inventoryItem.currentStock !== undefined && inventoryItem.reorderLevel !== undefined) {
        if (inventoryItem.currentStock === 0) {
          unavailableItems.push(itemName);
        } else if (inventoryItem.currentStock <= inventoryItem.reorderLevel) {
          lowStockItems.push(itemName);
        }
      }

      // Check expiry
      if (inventoryItem.expiryDate) {
        const expiryDate = new Date(inventoryItem.expiryDate);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        if (expiryDate < thirtyDaysFromNow) {
          expiringItems.push(itemName);
        }
      }
    }

    return {
      allAvailable: unavailableItems.length === 0,
      unavailableItems,
      lowStockItems,
      expiringItems
    };
  } catch (error) {
    console.error('Error checking inventory availability:', error);
    return {
      allAvailable: false,
      unavailableItems: [],
      lowStockItems: [],
      expiringItems: []
    };
  }
}

/**
 * Gets inventory requirements for a scheduled procedure
 */
export async function getInventoryRequirementsForProcedure(
  procedureId: string
): Promise<{
  requiredItems: PreferenceCardItemLink[];
  missingItems: string[];
  lowStockItems: string[];
}> {
  try {
    // Get procedure details
    const proceduresSnap = await getDocs(collection(db, 'generatedProcedures'));
    let procedure: any = null;

    proceduresSnap.forEach(doc => {
      if (doc.id === procedureId) {
        procedure = { id: doc.id, ...doc.data() };
      }
    });

    if (!procedure || !procedure.preferenceCardId) {
      return {
        requiredItems: [],
        missingItems: [],
        lowStockItems: []
      };
    }

    // Get preference card
    const prefSnap = await getDocs(collection(db, 'preferenceCards'));
    let preferenceCard: any = null;

    prefSnap.forEach(doc => {
      if (doc.id === procedure.preferenceCardId) {
        preferenceCard = { id: doc.id, ...doc.data() };
      }
    });

    if (!preferenceCard) {
      return {
        requiredItems: [],
        missingItems: [],
        lowStockItems: []
      };
    }

    // Check availability
    const availability = await checkInventoryAvailabilityForPreferenceCard(
      procedure.preferenceCardId
    );

    // Build required items list
    const requiredItems: PreferenceCardItemLink[] = [];
    const allItems = [
      ...((preferenceCard.equipment || []).map((name: string) => ({ name, type: 'equipment' }))),
      ...((preferenceCard.instruments || []).map((name: string) => ({ name, type: 'instrument' }))),
      ...((preferenceCard.implants || []).map((name: string) => ({ name, type: 'implant' })))
    ];

    for (const item of allItems) {
      const matches = await findMatchingInventoryItems(item.name, item.type);

      requiredItems.push({
        preferenceCardId: procedure.preferenceCardId,
        itemName: item.name,
        itemType: item.type as any,
        inventoryItemId: matches[0]?.id,
        inventoryItem: matches[0],
        isLinked: matches.length > 0
      });
    }

    return {
      requiredItems,
      missingItems: availability.unavailableItems,
      lowStockItems: availability.lowStockItems
    };
  } catch (error) {
    console.error('Error getting inventory requirements for procedure:', error);
    return {
      requiredItems: [],
      missingItems: [],
      lowStockItems: []
    };
  }
}
