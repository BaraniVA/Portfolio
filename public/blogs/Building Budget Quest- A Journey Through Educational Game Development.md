# Building Budget Quest: A Journey Through Educational Game Development

## The Spark of an Idea

The idea for *Budget Quest: School Survival* was born from an unexpected place—watching the TV show *Abbott Elementary*. The show portrayed teachers navigating the daily chaos of underfunded schools with humor and heart. It highlighted a truth that resonated with me deeply: educators are constantly asked to perform miracles with limited resources.

As a developer passionate about educational technology, I couldn’t stop thinking about how to bring this reality to life in an interactive, gamified way. Budget management is rarely considered exciting, but I saw a chance to turn it into a compelling experience—something that could inform, challenge, and entertain.

## Planning and Design Phase

### Establishing Core Mechanics

To transform budget allocation into a compelling gameplay loop, I had to identify core mechanics that could replicate the stress and decision-making pressures of a real school administrator. After brainstorming and paper prototyping, I settled on three pillars:

1. **Drag-and-drop resource allocation** – Giving players tactile control over how they spend limited funds.
2. **Stakeholder requests** – Teachers, staff, and students submit urgent (and sometimes conflicting) needs.
3. **Crisis management** – Randomized events like plumbing failures, viral social media scandals, or surprise inspections keep players on their toes.

I introduced two key metrics:
- **Doom Meter** – Increases with neglected responsibilities and mounting crises.
- **Morale** – Drops when player decisions alienate stakeholders.

Balancing these forces creates the game’s core tension: spend wisely or face the consequences.

### Visual and UX Design

The game’s aesthetic needed to walk a fine line—serious enough to respect its subject matter, but visually approachable to ensure engagement. I opted for a flat, illustrated style with soft colors and warm tones.

Wireframing taught me the importance of presenting critical data up front. The original design split key stats across multiple views, which confused testers. Iterative feedback led me to consolidate everything into a single, scrollable dashboard. The final result offers immediate visual feedback—gauges rise or fall dynamically based on decisions, reinforcing a sense of cause and effect.

## Technical Implementation

### Technology Stack

Choosing the right stack was crucial for speed, flexibility, and scalability:

- **React (with TypeScript)** – For strongly typed, component-based architecture.
- **Tailwind CSS** – Rapid, utility-first styling with consistent spacing and layout.
- **Zustand** – Chosen over Redux for minimal boilerplate and easy modular state stores.
- **Framer Motion** – For expressive, smooth animations.
- **Hello Pangea DND** – Powering the drag-and-drop interface.

The decision to use Zustand over Redux was a major turning point. Redux’s verbosity was slowing me down, especially as I layered interconnected systems. Zustand’s simple and reactive model kept my mental load low and the codebase nimble.

### Drag-and-Drop Resource Allocation

The drag-and-drop system was deceptively complex. Beyond simply moving items, it had to enforce rules:

- Enforce budget limits in real-time
- Support undo/redo history
- Provide feedback for invalid moves
- Animate transfers to reinforce decisions
- Stay accessible via keyboard and screen readers

Creating this polished, responsive interaction took nearly three weeks and dozens of tweaks—but it became the centerpiece of the game experience.

### Scalable Game Data Structure

Early prototypes stored events and requests in flat JSON arrays. This became a nightmare as the content grew—maintenance was error-prone and logic checks were scattered.

The solution? Strongly-typed interfaces and content factory functions:

```ts
interface CrisisEvent {
  id: string;
  title: string;
  description: string;
  options: CrisisOption[];
  trigger?: (gameState: GameState) => boolean;
}

const createCrisisEvent = (data: Partial<CrisisEvent>): CrisisEvent => {
  return {
    id: uuidv4(),
    title: 'Untitled Crisis',
    description: 'No description provided',
    options: [],
    ...data
  };
};
```

This pattern made it easier to add new content, validate correctness, and build automated testing for edge cases.

## Learning Experiences

### Managing Interconnected State

One of the toughest challenges was managing game state. Stakeholder requests could affect budget, which in turn could trigger a crisis, which might impact morale or doom. Everything was linked.

Initial attempts with `useReducer` inside nested contexts quickly became unwieldy. Switching to Zustand mid-project wasn’t easy—it required a complete refactor—but it gave me granular control over isolated state slices and significantly improved performance.

### Performance and Animation

As animations became more elaborate, frame drops started creeping in. Optimization became a priority:

- Moved from top-level component re-renders to scoped animations
- Used `transform` for GPU-accelerated movement
- Debounced expensive calculations
- Audited unnecessary reactivity in state subscriptions

The final game runs smoothly on mid-range hardware, with fallback states for lower-end devices.

## Roadblocks and Solutions

### Event and Scenario Design

Events needed to be engaging, educational, and unpredictable. That meant designing a *lot* of them—and ensuring variety without randomness feeling unfair.

I built a small content scripting system allowing events to:
- Include conditional triggers
- Offer multiple branching outcomes
- Affect multiple metrics simultaneously

This made the game richer and added replayability without hardcoding everything.

### Game Balance

Playtests revealed either runaway success or hopeless collapse. Fixing this required modeling scenarios in Excel, then integrating analytics into the game to track real-world outcomes.

Eventually, I implemented an adaptive difficulty system:
- Underperforming players receive soft boosts (like staff working overtime)
- Overachieving players get surprise challenges
- Every playthrough feels different, yet fair

## Community Reception

*Budget Quest* launched quietly, but gained traction in niche circles:

- **Educators** praised it as a discussion tool in civics and economics classes
- **Game designers** noted the clean UX and systemic depth
- **School administrators** said it echoed their real-world dilemmas eerily well

Some of my favorite feedback:
> “This game captures how soul-crushing budgeting can feel—and somehow makes it fun.”  
> — My Sister  
>  
> “I finally understand why our principal always says no to our requests. This game should come with my teacher certification.”  
> — My Mother  

## What’s Next?

This is just the beginning. Based on community feedback and my own ambitions, future plans include:

1. **District Mode** – Manage multiple schools and deal with political pressures
2. **Scenario Editor** – Empower teachers to create localized content
3. **Multiplayer Mode** – Compete/cooperate across schools sharing the same funds
4. **Mobile & Tablet Optimization** – A large chunk of my audience uses iPads
5. **Localization** – To expand the game’s reach internationally

## Key Lessons

Here’s what I’ll take with me to future projects:

- **Focus on the core loop early** – If the core isn't fun, no polish will save it
- **Structure your data from the start** – You’ll thank yourself later
- **Start small, iterate fast** – The first playable version was built in two weeks
- **Use tools that match your thinking style** – Zustand just *clicked* for me
- **Don’t underestimate polish** – Animations and feedback loops made the game feel alive

## Final Thoughts

*Budget Quest* has been the most personally fulfilling project I’ve ever built. It challenged me across disciplines—game design, front-end development, content design, accessibility, and community building. But more importantly, it taught me how powerful games can be as tools for empathy.

If you’re curious to try it, contribute to its growth, or just want to chat about educational games, check it out on GitHub or play the live version. I’d love to hear your feedback—and maybe collaborate on what’s next.

