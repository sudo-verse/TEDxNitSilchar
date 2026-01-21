# Implementation Plan - Looping Typing Animation

I have updated the Hero section to make the main headline's typing animation loop continuously.

## Changes
1.  **Updated `src/components/sections/HeroSection.tsx`**:
    -   Added state `typingState` to control the animation phase ("visible" or "hidden").
    -   Implemented a `useEffect` loop that starts when the section comes into view:
        1.  Sets state to `visible` (triggers typing animation).
        2.  Waits for **5 seconds** (allows animation to finish + comfortable reading time).
        3.  Sets state to `hidden` (triggers fade out).
        4.  Waits for **0.5 seconds** (allows fade out to complete).
        5.  Repeats.
    -   Updated the `motion.span` to listen to `typingState` instead of the static `hasBeenInView` boolean.
    -   Added a smooth transition to the `hidden` variant so the text fades out gracefully before restarting, rather than disappearing instantly.

## Verification
-   The text "Turning Lessons into Legacies" should type out character by character.
-   It should stay visible for a few seconds.
-   It should then fade out smoothly.
-   The cycle should repeat indefinitely.
