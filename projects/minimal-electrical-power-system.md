This project involves modeling a minimal Electrical Power Subsystem (EPS) for a CubeSat using CircuitJS1. The primary goal is to simulate the battery's charge and discharge behavior over repeated orbital cycles. The simulation covers a 60-minute sun period where the system generates approximately 6W of power to charge the battery and run loads, followed by a 30-minute eclipse period where the battery becomes the sole power source.

## FEATURES
* **Dynamic Orbit Simulation:** A timed current source models the 60-minute sun and 30-minute eclipse cycle, providing realistic power generation intervals.
* **Varied System Loads:** The simulation includes a continuous load (Onboard Computer), a sun-only load (Payload), and intermittent, pulse-based loads (TT&C and ADCS).
* **Charge/Discharge Battery Model:** A custom two-battery configuration simulates a realistic charge/discharge cycle, overcoming software limitations.
* **Real-time Data Plotting:** The circuit provides a visual plot of the battery's voltage and power, clearly showing the charging (sun) and discharging (eclipse) states over time.

## APPROACH & METHODOLOGY
The approach was to model each EPS component individually, with all subsystems drawing power from a central bus. To make the simulation practical, a time scale of 1 simulation second per 1 orbital minute was assumed. Continuous loads like the Onboard Computer were modeled as simple resistors, while intermittent loads like the TT&C and ADCS were switched using MOSFETs controlled by a clock to simulate periodic operation.

## TOOLS & CHALLENGES
* **CircuitJS1:** Used for the entire circuit design, simulation, and visualization.
* **Gemini (2.5 Pro & Flash):** Employed for initial research, to verify calculations, and brainstorm workarounds for software limitations.

Key challenges included working around software limitations, such as the absence of a dedicated battery component.