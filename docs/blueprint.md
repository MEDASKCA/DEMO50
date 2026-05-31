# Capacity Planner Blueprint

## Purpose
Capacity Planner is a standalone responsive web app for planning surgical, procedure, and room activity at Hadley Wood Private Hospital.

## MVP
- Weekly desktop board by resource and day
- Mobile day and week review
- Configurable specialties
- Configurable procedures
- Difficulty-aware procedure catalogue
- Staffing point requirements by specialty
- Estimated session duration and finish time
- Suggested patient arrival timing
- Recovery and ward capacity checks

## Core Planning Inputs
- Resources: theatres, rooms, clinic spaces
- Session lengths: AM and PM windows
- Specialty templates
- Procedure durations
- Staffing requirements and points
- Roster coverage
- Recovery and ward downstream capacity

## Capacity Logic
Each booking should evaluate:
- resource availability
- session duration fit
- hard-stop role minimums
- overall staffing points
- recovery support
- ward support
- estimated finish time
- patient arrival lead time

## Capacity States
- Bookable
- Review
- Constrained

## Next Build Areas
- Import Optima roster exports
- Editable bookings
- Persistent local storage or database
- Consultant profiles
- Recovery bay modelling
- Ward bed or chair modelling
