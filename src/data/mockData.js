export const initialTopics = [
  {
    id: "neural-networks",
    title: "Neural Networks & Backpropagation",
    tagline: "How machines calculate mistakes and learn backwards",
    category: "Computer Science",
    difficulty: "Intermediate",
    estimatedTime: "15 mins",
    badgeColor: "blue",
    icon: "BrainCircuit",
    overview: "Neural networks process data through interconnected layers of artificial neurons. Backpropagation is the cornerstone mathematical algorithm that calculates the gradient of the loss function with respect to weights, allowing the model to minimize error through gradient descent.",
    simplifications: {
      eli5: {
        title: "The Archery Coach Analogy",
        analogy: "Imagine an archer shooting arrows at a target blindfolded. A spotter yells: 'You missed 2 feet too high and 1 foot to the left!'",
        explanation: "Each round, the archer adjusts their aim in the opposite direction of the mistake. In a neural network, the spotter is the loss function, and the subtle adjustments to wrist and bow angle are the weight updates using backpropagation.",
        keyTakeaway: "You don't need magic to learn; you just need to measure how wrong you were and nudge every knob slightly in the opposite direction."
      },
      highSchool: {
        title: "Layered Feature Detectors & Error Feedback",
        analogy: "An assembly line where each worker checks finer details (edges → shapes → faces) and gets feedback when a defective product reaches the end.",
        explanation: "Input layers receive raw numbers (pixel values). Hidden layers perform weighted sums (W · X + b) passed through non-linear activation functions (ReLU, Sigmoid). The output layer predicts a class. The difference between prediction and actual label generates an error signal propagated backwards.",
        keyTakeaway: "Non-linear activations allow networks to model complex boundaries beyond simple straight lines."
      },
      collegePro: {
        title: "Chain Rule on Computational Graphs & Tensor Gradients",
        analogy: "Decomposing total system variance across composite functions f(g(h(x))) using multivariate calculus.",
        explanation: "Backpropagation computes ∂L/∂w_ij by applying the chain rule of calculus backwards from the scalar loss L through activations and weighted sums: ∂L/∂w = (∂L/∂a) · (∂a/∂z) · (∂z/∂w). Stochastic Gradient Descent updates weights: W ← W - η · ∇_W(L).",
        keyTakeaway: "Vanishing and exploding gradients occur when consecutive Jacobian eigenvalues are strictly smaller or larger than 1, solved by residual connections and layer normalization."
      }
    },
    visualSteps: [
      {
        step: 1,
        title: "Forward Pass: Data Flows Forward",
        description: "Raw inputs (e.g. image pixels) enter the input layer. Each neuron multiplies inputs by weights, sums them, adds a bias term, and passes through an activation function.",
        highlightNode: "input-to-hidden",
        formula: "z = W · x + b,  a = σ(z)",
        tip: "Activations like ReLU (max(0, z)) prevent linear collapse so deep networks can learn complex shapes."
      },
      {
        step: 2,
        title: "Loss Computation: Calculating the Error",
        description: "The predicted output is compared against ground truth using a loss function (e.g. Mean Squared Error or Cross-Entropy). This produces a single scalar representing total mistake.",
        highlightNode: "output-loss",
        formula: "L = -∑ y_true · log(y_pred)",
        tip: "A low loss means high confidence in correct answers; a high loss triggers major weight adjustments."
      },
      {
        step: 3,
        title: "Backward Pass: Applying the Chain Rule",
        description: "Starting from the output loss, gradients are propagated backwards through each layer. The chain rule breaks down the derivative into manageable local gradients.",
        highlightNode: "hidden-gradients",
        formula: "∂L/∂w = (∂L/∂y) · (∂y/∂z) · (∂z/∂w)",
        tip: "Each neuron calculates: 'How much am I personally responsible for the final blunder?'"
      },
      {
        step: 4,
        title: "Weight Update: Gradient Descent Step",
        description: "Every weight is tweaked in the opposite direction of its gradient, scaled by the learning rate (η). The loss landscape dips downward toward the minimum.",
        highlightNode: "weight-update",
        formula: "W_new = W_old - η · ∇L",
        tip: "A learning rate too large causes oscillations; too small takes weeks to converge."
      }
    ],
    visualCards: [
      {
        id: "card-1",
        frontTitle: "Artificial Neuron (Perceptron)",
        frontSubtitle: "The atomic building block of deep learning",
        diagramType: "neuron",
        backTitle: "How a Neuron Computes",
        backContent: "Takes multiple inputs x1, x2... multiplies each by a synaptic weight w1, w2, sums them up with bias b, and fires through an activation function like ReLU.",
        analogy: "Like deciding whether to go outside: temperature (0.4) + rain chance (-0.9) + friends going (0.8) > threshold.",
        keyMetric: "Input Dimensions → Scalar Output"
      },
      {
        id: "card-2",
        frontTitle: "Activation Functions",
        frontSubtitle: "Injecting non-linearity into linear algebra",
        diagramType: "activation",
        backTitle: "ReLU vs Sigmoid vs Softmax",
        backContent: "Without non-linear activations, stacking 100 layers would mathematically collapse into a single matrix multiplication! ReLU: f(x)=max(0,x) avoids saturation.",
        analogy: "Like a light switch with a dimmer: below threshold it's OFF; above it shines proportionally.",
        keyMetric: "f(x) = max(0, x)"
      },
      {
        id: "card-3",
        frontTitle: "The Loss Landscape",
        frontSubtitle: "Navigating high-dimensional mountains and valleys",
        diagramType: "loss-landscape",
        backTitle: "Finding the Global Minimum",
        backContent: "Imagine rolling a marble down a foggy mountain terrain to find the lowest valley. Gradient descent calculates the steepest downhill slope at your current position.",
        analogy: "Hiking down a mountain in dense fog by feeling which way the ground slopes under your boots.",
        keyMetric: "Gradient = Steepest ascent vector"
      },
      {
        id: "card-4",
        frontTitle: "Vanishing Gradients",
        frontSubtitle: "When deep networks stop learning",
        diagramType: "vanishing",
        backTitle: "Why ResNets Changed Everything",
        backContent: "In deep networks with Sigmoid, repeatedly multiplying gradients < 0.25 makes the gradient shrink exponentially to zero. Residual 'skip connections' bypass layers directly.",
        analogy: "A message whispered across 50 people gets lost; an express megaphone directly to the back row keeps it clear.",
        keyMetric: "Residual: F(x) + x"
      }
    ],
    quiz: [
      {
        id: "q1",
        question: "What is the primary role of the activation function in a neural network?",
        options: [
          "To speed up hard drive reading speeds",
          "To introduce non-linearity so the network can learn non-linear patterns",
          "To store training weights permanently into memory",
          "To reduce the number of training epochs to exactly one"
        ],
        correctIndex: 1,
        hint: "Think about what happens when you multiply multiple linear equations together.",
        explanation: "Without non-linear activation functions (like ReLU), multiple linear layers can be mathematically simplified to a single matrix multiplication, preventing the model from fitting complex curved boundaries."
      },
      {
        id: "q2",
        question: "During backpropagation, which fundamental calculus rule is used to propagate errors backward through layers?",
        options: [
          "Pythagorean Theorem",
          "The Chain Rule",
          "L'Hôpital's Rule",
          "Taylor Series Expansion"
        ],
        correctIndex: 1,
        hint: "It deals with finding the derivative of composite functions f(g(x)).",
        explanation: "The chain rule allows us to calculate the derivative of composite functions ∂L/∂w = (∂L/∂a) · (∂a/∂z) · (∂z/∂w), computing layer-by-layer gradients iteratively."
      },
      {
        id: "q3",
        question: "What happens if the learning rate (η) is set excessively high during gradient descent?",
        options: [
          "The weights converge instantly to zero error",
          "The loss function fails to compute",
          "The training may oscillate erratically or diverge away from the minimum",
          "The input data becomes corrupted"
        ],
        correctIndex: 2,
        hint: "Imagine taking giant leaps across a narrow canyon.",
        explanation: "A learning rate that is too high causes the optimizer to overshoot the valley/minimum repeatedly, leading to erratic oscillations or numerical overflow (divergence)."
      },
      {
        id: "q4",
        question: "Why is ReLU (Rectified Linear Unit) favored over Sigmoid in deep hidden layers?",
        options: [
          "It completely avoids negative numbers in inputs",
          "Its derivative does not saturate for positive values, alleviating vanishing gradients",
          "It requires quadratic matrix operations",
          "It forces all weights to sum to 1.0"
        ],
        correctIndex: 1,
        hint: "Consider what happens to the slope of Sigmoid when inputs get very large.",
        explanation: "For positive inputs, ReLU's derivative is a constant 1.0, which prevents the gradient from shrinking to zero over many consecutive layers, unlike Sigmoid whose max derivative is only 0.25."
      },
      {
        id: "q5",
        question: "In the update rule W ← W - η · ∇L, what does the negative sign signify?",
        options: [
          "Moving in the direction of steepest descent to minimize loss",
          "Subtracting bad neurons from the network",
          "Inverting the image colors for normalization",
          "Setting all parameters to negative values"
        ],
        correctIndex: 0,
        hint: "The gradient vector ∇L points uphill toward higher error.",
        explanation: "The gradient ∇L points in the direction of steepest *increase* of the loss function. To minimize error, we must step in the opposite (negative) direction."
      }
    ]
  },
  {
    id: "photosynthesis",
    title: "Photosynthesis & Cellular Respiration",
    tagline: "The planetary solar battery that fuels all aerobic life",
    category: "Biology",
    difficulty: "Beginner",
    estimatedTime: "12 mins",
    badgeColor: "emerald",
    icon: "Leaf",
    overview: "Photosynthesis converts solar photon energy, carbon dioxide, and water into chemical glucose and oxygen inside chloroplasts. Cellular respiration in mitochondria then breaks glucose down to recharge ATP, the universal energy currency.",
    simplifications: {
      eli5: {
        title: "The Solar Kitchen & Battery Pack",
        analogy: "Leaves are solar-powered bakeries. They bake sugar cookies using sunlight, water, and air.",
        explanation: "Plants take sunlight, water from roots, and air (carbon dioxide) to bake glucose cookies. When animals eat the cookie or plants need energy at night, mitochondria crack open the cookie to power miniature biological batteries called ATP.",
        keyTakeaway: "Photosynthesis makes the energy bar; respiration eats the energy bar to run around."
      },
      highSchool: {
        title: "Chloroplast Light Reactions & The Calvin Cycle",
        analogy: "A two-stage production plant: Stage 1 charges battery trucks (ATP/NADPH); Stage 2 uses those trucks to assemble sugar blocks.",
        explanation: "In thylakoids, photon energy splits H2O, generating O2 and pumping protons to produce ATP and NADPH. In the stroma, the light-independent Calvin cycle uses enzyme RuBisCO to fix CO2 into 3-carbon sugars (G3P).",
        keyTakeaway: "Light reactions store photon energy into ATP/NADPH; the Calvin cycle locks that energy into stable glucose."
      },
      collegePro: {
        title: "Chemiosmotic Proton Gradients & Oxidative Phosphorylation",
        analogy: "A hydroelectric turbine driven by a microscopic proton dam across lipid membranes.",
        explanation: "Electrons excited in Photosystem II and I travel down the cytochromes, pumping H+ across the thylakoid membrane into the lumen. Protons flow back through the rotor of ATP Synthase (F0F1 complex), mechanically joining ADP + Pi into ATP via proton-motive force (PMF).",
        keyTakeaway: "ATP synthesis in both chloroplasts and mitochondria is driven by thermodynamic chemiosmosis discovered by Peter Mitchell."
      }
    },
    visualSteps: [
      {
        step: 1,
        title: "Photon Absorption in Photosystem II",
        description: "Sunlight strikes chlorophyll molecules in the thylakoid membrane. Excited electrons escape and split H2O into oxygen gas, protons (H+), and free electrons.",
        highlightNode: "ps2",
        formula: "2H2O + 4 photons → O2 + 4H+ + 4e-",
        tip: "This water-splitting step is the origin of virtually all breathable oxygen on Earth!"
      },
      {
        step: 2,
        title: "Proton Pumping & Electron Transport Chain",
        description: "High-energy electrons cascade down membrane carrier proteins. Their energy pumps H+ ions into the thylakoid interior, establishing an electrochemical gradient.",
        highlightNode: "etc",
        formula: "ΔpH + ΔΨ = Proton Motive Force",
        tip: "Like pumping water up into a high reservoir behind a hydroelectric dam."
      },
      {
        step: 3,
        title: "ATP Synthase Rotary Engine",
        description: "Protons rush down their concentration gradient through ATP Synthase. The mechanical rotation of the enzyme's central stalk recharges ADP into high-energy ATP.",
        highlightNode: "atp-synthase",
        formula: "ADP + Pi + H+ flow → ATP",
        tip: "ATP Synthase is literally a microscopic molecular motor spinning at over 6,000 RPM."
      },
      {
        step: 4,
        title: "Calvin Cycle & Glucose Synthesis",
        description: "In the fluid stroma, ATP and NADPH drive the fixation of carbon dioxide molecules into glyceraldehyde-3-phosphate, which pairs to form glucose.",
        highlightNode: "calvin",
        formula: "6CO2 + 6H2O + light → C6H12O6 + 6O2",
        tip: "RuBisCO is the most abundant protein on Earth, responsible for fixing ~200 billion tons of CO2 annually."
      }
    ],
    visualCards: [
      {
        id: "card-p1",
        frontTitle: "Chloroplast Anatomy",
        frontSubtitle: "Thylakoid discs, grana stacks, and stroma fluid",
        diagramType: "chloroplast",
        backTitle: "Where the Miracle Happens",
        backContent: "Thylakoid membranes contain chlorophyll for light reactions. Stroma is the dense fluid where the dark reactions (Calvin cycle) manufacture sugars.",
        analogy: "Thylakoids are solar panels; stroma is the automated kitchen workbench.",
        keyMetric: "Double Membrane Organelle"
      },
      {
        id: "card-p2",
        frontTitle: "ATP: Cellular Currency",
        frontSubtitle: "Adenosine triphosphate with 3 high-energy phosphate bonds",
        diagramType: "atp-molecule",
        backTitle: "How ATP Releases Energy",
        backContent: "The three negatively charged phosphate groups repel each other like compressed springs. Cleaving the terminal phosphate into ADP releases ~30.5 kJ/mol of energy.",
        analogy: "Like a loaded mousetrap waiting to snap and do work when triggered.",
        keyMetric: "ATP ⇌ ADP + Pi (ΔG° = -30.5 kJ/mol)"
      },
      {
        id: "card-p3",
        frontTitle: "The Calvin Cycle",
        frontSubtitle: "Carbon fixation, reduction, and RuBP regeneration",
        diagramType: "calvin-cycle",
        backTitle: "Light-Independent Sugar Assembly",
        backContent: "Operates in three stages: Carbon fixation by RuBisCO, reduction by NADPH and ATP to form G3P sugar, and regeneration of RuBP so the cycle can repeat.",
        analogy: "A circular conveyor belt that grabs CO2 bricks and glues them into sugar blocks.",
        keyMetric: "Requires 18 ATP & 12 NADPH per Glucose"
      },
      {
        id: "card-p4",
        frontTitle: "Mitochondria vs Chloroplast",
        frontSubtitle: "The complementary biological powerhouses",
        diagramType: "comparison-organelles",
        backTitle: "The Planetary Energy Loop",
        backContent: "Chloroplasts build glucose and release oxygen using sunlight; mitochondria consume glucose and oxygen to generate ATP, releasing CO2 and water. A closed ecological loop.",
        analogy: "Chloroplast is the solar charging dock; Mitochondria is the portable device consuming the power.",
        keyMetric: "Total Yield ~30-32 ATP per Glucose"
      }
    ],
    quiz: [
      {
        id: "qp1",
        question: "Where in the chloroplast do the light-dependent reactions occur?",
        options: [
          "In the thylakoid membranes",
          "In the stroma fluid only",
          "Inside the nucleus",
          "Inside the cellular vacuole"
        ],
        correctIndex: 0,
        hint: "It takes place in the flattened green sac membranes containing chlorophyll.",
        explanation: "The light reactions happen in and across the thylakoid membranes, where chlorophyll pigment complexes and ATP synthase enzymes are embedded."
      },
      {
        id: "qp2",
        question: "What is the primary source of the oxygen gas (O2) released during photosynthesis?",
        options: [
          "The breakdown of carbon dioxide (CO2)",
          "The splitting of water molecules (H2O)",
          "The decomposition of soil nitrates",
          "The release of trapped air pockets"
        ],
        correctIndex: 1,
        hint: "Photosystem II strips electrons from a very common liquid.",
        explanation: "Oxygen gas released by plants comes entirely from the photolysis (splitting) of water molecules (2H2O → O2 + 4H+ + 4e-) to replace excited electrons in Photosystem II."
      },
      {
        id: "qp3",
        question: "What enzyme catalyzes the initial carbon-fixing step of the Calvin cycle?",
        options: [
          "DNA Polymerase",
          "RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase)",
          "Amylase",
          "Catalase"
        ],
        correctIndex: 1,
        hint: "It is often noted as the most abundant enzyme on Earth.",
        explanation: "RuBisCO fixes carbon dioxide by attaching it to ribulose 1,5-bisphosphate (RuBP), initiating the production of sugars in the Calvin cycle."
      },
      {
        id: "qp4",
        question: "How does ATP Synthase generate ATP from ADP and phosphate?",
        options: [
          "By burning glucose directly in the inner matrix",
          "By using the flow of protons (H+) across a membrane to drive rotational catalysis",
          "By absorbing ultraviolet radiation directly",
          "By absorbing excess nitrogen gas"
        ],
        correctIndex: 1,
        hint: "Think about chemiosmosis and rotary molecular machines.",
        explanation: "Protons flowing down their electrochemical gradient turn the rotor subunits of ATP Synthase, inducing conformational changes that synthesize ATP from ADP and Pi."
      },
      {
        id: "qp5",
        question: "What is the relationship between photosynthesis and cellular respiration?",
        options: [
          "They are identical chemical reactions happening at the same time",
          "The products of photosynthesis (glucose and O2) are the reactants for cellular respiration",
          "Photosynthesis happens only in animals and respiration only in plants",
          "They both consume oxygen and release carbon dioxide"
        ],
        correctIndex: 1,
        hint: "They form a complementary ecological cycle.",
        explanation: "Photosynthesis produces glucose and oxygen, which aerobic organisms (and plants themselves) use in cellular respiration to regenerate ATP, producing CO2 and H2O as byproducts."
      }
    ]
  },
  {
    id: "quantum-computing",
    title: "Quantum Superposition & Qubits",
    tagline: "Computing with infinite parallel possibilities",
    category: "Physics & Computing",
    difficulty: "Advanced",
    estimatedTime: "18 mins",
    badgeColor: "purple",
    icon: "Atom",
    overview: "Classical computers process deterministic bits that are strictly 0 or 1. Quantum computers harness quantum mechanics—specifically superposition and entanglement—to manipulate state vectors across complex Hilbert spaces, enabling exponential speedups for specialized problems like Shor's and Grover's algorithms.",
    simplifications: {
      eli5: {
        title: "The Spinning Coin Analogy",
        analogy: "A classical coin lying flat on a table is either definitely Heads (1) or Tails (0).",
        explanation: "A quantum bit (qubit) is like a coin spinning rapidly on a tabletop. While it's spinning, it is a blend of both heads and tails simultaneously. Only when you slap your hand down to measure it does it collapse into a definite Heads or Tails.",
        keyTakeaway: "Superposition lets a computer explore many possible answers at the exact same moment before looking."
      },
      highSchool: {
        title: "The Bloch Sphere & Quantum States",
        analogy: "A classical bit can only be the North Pole (0) or South Pole (1). A qubit can point anywhere on the surface of the globe.",
        explanation: "A qubit state is represented as |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex probability amplitudes satisfying |α|² + |β|² = 1. Quantum gates are 3D rotations of this state vector around the sphere.",
        keyTakeaway: "With n qubits, a quantum computer can represent 2^n states simultaneously."
      },
      collegePro: {
        title: "Unitary Evolution & Entangled Hilbert Spaces",
        analogy: "Linear algebra transformations preserving inner products across 2^n dimensional vector spaces.",
        explanation: "Quantum algorithms apply unitary transformations U (where U†U = I) to prevent information loss. Entanglement creates inseparable tensor products |ψ⟩ ≠ |ψ_A⟩ ⊗ |ψ_B⟩, such as the Bell state (|00⟩ + |11⟩)/√2, where measurement of one qubit instantly defines the other regardless of spatial separation.",
        keyTakeaway: "Quantum advantage does not mean checking all paths blindly, but engineering destructive interference on wrong paths and constructive interference on correct solutions."
      }
    },
    visualSteps: [
      {
        step: 1,
        title: "Initialize in Pure Ground State",
        description: "All qubits are cooled to near absolute zero (-273.15°C) and initialized into the base computational state |0⟩.",
        highlightNode: "init",
        formula: "|ψ_0⟩ = |00...0⟩",
        tip: "Dilution refrigerators keep quantum chips colder than outer space to prevent thermal decoherence."
      },
      {
        step: 2,
        title: "Hadamard Gate: Enter Superposition",
        description: "Applying a Hadamard gate (H) rotates the state vector to the equator of the Bloch sphere, giving equal 50/50 probability of measuring 0 or 1.",
        highlightNode: "hadamard",
        formula: "H|0⟩ = (|0⟩ + |1⟩) / √2",
        tip: "With 50 qubits in superposition, you hold 1,125,899,906,842,624 states simultaneously."
      },
      {
        step: 3,
        title: "Entanglement with CNOT Gate",
        description: "A Controlled-NOT gate entangles two qubits. If the control qubit is 1, the target qubit flips, binding their destinies together.",
        highlightNode: "entangle",
        formula: "CNOT: |00⟩→|00⟩, |10⟩→|11⟩",
        tip: "Einstein famously called entanglement 'spooky action at a distance'."
      },
      {
        step: 4,
        title: "Interference & Measurement Collapse",
        description: "Quantum gates induce constructive interference for correct solutions and destructive interference for errors. Measurement collapses the probabilistic state into definite classical bits.",
        highlightNode: "measure",
        formula: "P(x) = |⟨x|ψ⟩|²",
        tip: "Quantum algorithms are designed so wrong answers cancel each other out like colliding waves."
      }
    ],
    visualCards: [
      {
        id: "card-q1",
        frontTitle: "The Bloch Sphere",
        frontSubtitle: "Geometric representation of a single qubit state",
        diagramType: "bloch-sphere",
        backTitle: "Navigating Quantum Coordinates",
        backContent: "North pole represents state |0⟩, South pole represents |1⟩. Any point on the sphere surface is a valid pure quantum state defined by angles θ and φ.",
        analogy: "Like GPS coordinates on Earth, but pointing to possibilities rather than locations.",
        keyMetric: "|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩"
      },
      {
        id: "card-q2",
        frontTitle: "Quantum Entanglement",
        frontSubtitle: "Non-local correlation between particles",
        diagramType: "entanglement",
        backTitle: "The Bell States",
        backContent: "Two particles share an entangled wave function. Measuring one instantly dictates the measurement of the other, even light-years apart.",
        analogy: "A magic pair of shoes in two boxes: open one and see a Left shoe, you instantly know the other box contains the Right shoe.",
        keyMetric: "Bell State: (|00⟩ + |11⟩)/√2"
      },
      {
        id: "card-q3",
        frontTitle: "Quantum Interference",
        frontSubtitle: "Amplifying right answers, canceling wrong ones",
        diagramType: "interference",
        backTitle: "The True Secret of Quantum Speedup",
        backContent: "Amplitudes can be positive, negative, or complex. By creating phase shifts, quantum algorithms cancel wrong answers and peak the probability amplitude of the target.",
        analogy: "Noise-canceling headphones: creating an opposing sound wave that silences unwanted noise.",
        keyMetric: "Constructive vs Destructive Interference"
      },
      {
        id: "card-q4",
        frontTitle: "Quantum Decoherence",
        frontSubtitle: "The Achilles heel of quantum computers",
        diagramType: "decoherence",
        backTitle: "Why Quantum Computers are Hard to Build",
        backContent: "Stray heat, cosmic rays, or electromagnetic noise can cause the delicate superposition to collapse prematurely, corrupting computations into random noise.",
        analogy: "Balancing an egg on the tip of a pencil during a mild earthquake.",
        keyMetric: "T1 (relaxation) and T2 (dephasing) times"
      }
    ],
    quiz: [
      {
        id: "qq1",
        question: "What is the key difference between a classical bit and a quantum qubit?",
        options: [
          "A classical bit is faster while a qubit has more storage on disk",
          "A bit is strictly 0 or 1, while a qubit can exist in a superposition of both states",
          "A qubit only works with optical fiber cables",
          "A classical bit uses quantum tunneling exclusively"
        ],
        correctIndex: 1,
        hint: "Think about the spinning coin analogy.",
        explanation: "Classical bits are deterministic binary values (0 or 1). Qubits can exist in a linear superposition α|0⟩ + β|1⟩ with continuous probability amplitudes."
      },
      {
        id: "qq2",
        question: "What geometric sphere is universally used to visualize the state of a single two-level qubit?",
        options: [
          "Riemann Sphere",
          "Bloch Sphere",
          "Poincaré Disc",
          "Fermi Sphere"
        ],
        correctIndex: 1,
        hint: "Named after Nobel laureate Felix Bloch.",
        explanation: "The Bloch Sphere is a geometrical representation of the pure state space of a two-level quantum mechanical system (qubit)."
      },
      {
        id: "qq3",
        question: "If you have 10 entangled qubits, how many basis state amplitudes can be represented simultaneously?",
        options: [
          "10",
          "20",
          "100",
          "2^10 (1,024)"
        ],
        correctIndex: 3,
        hint: "Quantum state space grows exponentially (2^n).",
        explanation: "Because the Hilbert space doubles with each additional qubit, n entangled qubits can represent 2^n complex probability amplitudes simultaneously (2^10 = 1,024)."
      },
      {
        id: "qq4",
        question: "Which quantum logic gate is used to transform a deterministic |0⟩ state into an equal superposition?",
        options: [
          "Pauli-X Gate",
          "Hadamard Gate (H)",
          "Phase Shift Gate (S)",
          "Toffoli Gate"
        ],
        correctIndex: 1,
        hint: "It creates (|0⟩ + |1⟩) / √2.",
        explanation: "The Hadamard gate maps the basis state |0⟩ to (|0⟩ + |1⟩)/√2 and |1⟩ to (|0⟩ - |1⟩)/√2, placing the qubit in an equal superposition state."
      },
      {
        id: "qq5",
        question: "What phenomenon describes when environmental noise causes qubits to lose their quantum properties?",
        options: [
          "Decoherence",
          "Quantum teleportation",
          "Superconduction",
          "Optical refraction"
        ],
        correctIndex: 0,
        hint: "The loss of coherence due to thermal interaction.",
        explanation: "Quantum decoherence occurs when a quantum system interacts with its environment, destroying phase coherence and turning quantum superpositions into classical probability distributions."
      }
    ]
  },
  {
    id: "derivatives",
    title: "Calculus: Intuitive Derivatives",
    tagline: "The mathematics of instantaneous change and slopes",
    category: "Mathematics",
    difficulty: "Beginner",
    estimatedTime: "10 mins",
    badgeColor: "indigo",
    icon: "TrendingUp",
    overview: "Derivatives measure how a quantity changes in response to infinitesimal changes in another variable. Instead of static formulas, visualizing secant lines shrinking to tangent lines reveals the true intuitive nature of rates of change.",
    simplifications: {
      eli5: {
        title: "The Speedometer at a Freeze Frame",
        analogy: "Driving a car from Home to School takes 30 minutes for 15 miles (average 30 mph).",
        explanation: "An average speed tells you the whole trip. But if a police radar snaps you at a single split-second, your speedometer says 47 mph! The derivative is simply what your speedometer reads right now, at this exact frozen millisecond.",
        keyTakeaway: "Derivatives turn an entire journey into the instant speed of 'right now'."
      },
      highSchool: {
        title: "Secant Line Collapsing into a Tangent Line",
        analogy: "Zooming into a curved roller coaster track until it looks like a straight ruler.",
        explanation: "Slope is (Δy / Δx). To find the slope at one exact point, bring two points closer and closer together until the distance h between them approaches zero: lim(h→0) [f(x+h) - f(x)] / h.",
        keyTakeaway: "Zoom into any smooth curve far enough, and it becomes indistinguishable from a straight line."
      },
      collegePro: {
        title: "Linear Approximation & Differential Forms",
        analogy: "The best local first-order affine mapping approximating a smooth manifold.",
        explanation: "The derivative f'(x) defines the local Jacobian/linear operator df = f'(x)dx. It represents the best linear approximation: f(x + Δx) ≈ f(x) + f'(x)Δx + o(Δx).",
        keyTakeaway: "Calculus is the art of replacing complicated curved functions with easy straight lines over tiny intervals."
      }
    },
    visualSteps: [
      {
        step: 1,
        title: "Start with Average Rate of Change",
        description: "Choose two points on the curve (x, f(x)) and (x+h, f(x+h)). Draw a secant line connecting them.",
        highlightNode: "secant",
        formula: "Slope = [f(x+h) - f(x)] / h",
        tip: "This gives the average slope over distance h, like average road trip speed."
      },
      {
        step: 2,
        title: "Shrink the Interval h Toward Zero",
        description: "Slide the second point closer and closer to the first point. As h shrinks, the secant line rotates closer to the curve's instantaneous direction.",
        highlightNode: "shrink-h",
        formula: "h → 0",
        tip: "Notice that h never actually equals zero (which would divide by 0), but approaches arbitrarily close."
      },
      {
        step: 3,
        title: "The Tangent Line is Born",
        description: "At the limit, the secant line turns into the tangent line, kissing the curve at exactly one point with slope f'(x).",
        highlightNode: "tangent",
        formula: "f'(x) = lim(h→0) [f(x+h) - f(x)] / h",
        tip: "A positive slope means the function is climbing; negative slope means it's falling; zero means a peak or valley!"
      },
      {
        step: 4,
        title: "Optimization: Finding Maximums & Minimums",
        description: "Where the derivative equals zero (f'(x) = 0), the tangent line is completely flat. These critical points reveal peaks, valleys, and optimal solutions.",
        highlightNode: "critical-point",
        formula: "f'(x*) = 0",
        tip: "Every machine learning algorithm optimizes weights by finding points where slope = 0."
      }
    ],
    visualCards: [
      {
        id: "card-d1",
        frontTitle: "Secant vs Tangent Line",
        frontSubtitle: "From average speed to instantaneous speed",
        diagramType: "secant-tangent",
        backTitle: "The Limit in Action",
        backContent: "A secant line crosses two points; a tangent line grazes the curve at one point, sharing the curve's exact slope at that instant.",
        analogy: "Secant is looking at two pictures taken 1 hour apart; Tangent is looking at a high-speed motion blur frame.",
        keyMetric: "lim(h→0) Δy/Δx"
      },
      {
        id: "card-d2",
        frontTitle: "The Power Rule: d/dx(x^n) = n*x^(n-1)",
        frontSubtitle: "The most useful differentiation shortcut",
        diagramType: "power-rule",
        backTitle: "Why the Power Rule Works",
        backContent: "Expanding (x+h)^n using the binomial theorem gives x^n + n*x^(n-1)*h + O(h^2). Subtracting x^n and dividing by h leaves n*x^(n-1) as h vanishes.",
        analogy: "Like knocking down the exponent as a coefficient and reducing the remaining power by 1.",
        keyMetric: "d/dx(x^3) = 3x^2"
      },
      {
        id: "card-d3",
        frontTitle: "Critical Points (f'(x) = 0)",
        frontSubtitle: "Finding local maximums and minimums",
        diagramType: "peaks-valleys",
        backTitle: "The Foundation of Optimization",
        backContent: "At the highest peak of a hill or lowest valley, the ground is momentarily horizontal. Setting derivative to 0 reveals optimal points.",
        analogy: "Reaching the summit of a hill: for one step, you are neither walking uphill nor downhill.",
        keyMetric: "First Derivative Test"
      },
      {
        id: "card-d4",
        frontTitle: "Partial Derivatives & Gradients",
        frontSubtitle: "When functions have multiple input variables",
        diagramType: "gradient-vector",
        backTitle: "Slopes in 3D and Beyond",
        backContent: "For z = f(x, y), ∂f/∂x measures slope moving along X while holding Y frozen. The gradient vector ∇f points in the direction of steepest ascent.",
        analogy: "Walking on a terrain: checking the slope facing strictly North vs strictly East.",
        keyMetric: "∇f = (∂f/∂x, ∂f/∂y)"
      }
    ],
    quiz: [
      {
        id: "qd1",
        question: "What does the derivative of a function at a specific point represent geometrically?",
        options: [
          "The area under the curve from zero to that point",
          "The slope of the tangent line to the curve at that point",
          "The distance from that point to the origin",
          "The perimeter of the bounding box"
        ],
        correctIndex: 1,
        hint: "Think about the line that grazes the curve at that exact location.",
        explanation: "Geometrically, the derivative f'(a) is the slope of the line tangent to the graph of y = f(x) at the point (a, f(a))."
      },
      {
        id: "qd2",
        question: "Using the power rule, what is the derivative of f(x) = x^4 with respect to x?",
        options: [
          "4x^3",
          "x^3",
          "4x^4",
          "12x^2"
        ],
        correctIndex: 0,
        hint: "Multiply by the old exponent and subtract 1 from the power.",
        explanation: "By the power rule, d/dx(x^n) = n · x^(n-1). For x^4, it evaluates to 4 · x^(4-1) = 4x^3."
      },
      {
        id: "qd3",
        question: "If the first derivative f'(x) of a continuous function is zero at x = 3, what could x = 3 represent?",
        options: [
          "A point where the function undefined",
          "A critical point (local minimum, local maximum, or inflection point)",
          "An asymptote where the curve shoots to infinity",
          "The origin of the coordinate system"
        ],
        correctIndex: 1,
        hint: "The tangent line is horizontal.",
        explanation: "Points where f'(x) = 0 have horizontal tangent lines and are called critical points, often representing local extrema (peaks or valleys)."
      },
      {
        id: "qd4",
        question: "If an object's position at time t is s(t), what physical quantity does the first derivative s'(t) represent?",
        options: [
          "Acceleration",
          "Instantaneous Velocity",
          "Total mass",
          "Frictional coefficient"
        ],
        correctIndex: 1,
        hint: "Rate of change of position over time.",
        explanation: "The first derivative of position with respect to time represents velocity. The second derivative s''(t) represents acceleration."
      },
      {
        id: "qd5",
        question: "What happens to the difference quotient [f(x+h) - f(x)] / h as h approaches 0?",
        options: [
          "It always evaluates to 0 / 0 and becomes undefined",
          "It approaches the instantaneous rate of change (the derivative)",
          "It equals the integral of the function",
          "It multiplies by the square root of h"
        ],
        correctIndex: 1,
        hint: "This is the formal definition of the derivative.",
        explanation: "By definition, the limit as h → 0 of the difference quotient is the derivative, giving the exact instantaneous rate of change."
      }
    ]
  }
];

export const learningRoadmaps = [
  {
    id: "ai-engineer",
    title: "Full-Stack AI & Machine Learning Engineer",
    description: "From mathematical foundations to training neural architectures and deploying generative AI pipelines.",
    totalModules: 6,
    completedModules: 3,
    estimatedTotalHours: 45,
    milestones: [
      {
        id: "m1",
        title: "Calculus & Linear Algebra Foundations",
        status: "completed",
        level: "Core Foundation",
        hours: "8 hrs",
        topicId: "derivatives",
        description: "Master partial derivatives, gradient vectors, eigenvalues, and matrix decomposition.",
        skills: ["Derivatives", "Matrix Multiplications", "Optimization"]
      },
      {
        id: "m2",
        title: "Statistical Learning & Data Pipelines",
        status: "completed",
        level: "Core Foundation",
        hours: "10 hrs",
        topicId: null,
        description: "Probability distributions, maximum likelihood estimation, feature scaling, and PCA.",
        skills: ["Hypothesis Testing", "Bayesian Priors", "Normalization"]
      },
      {
        id: "m3",
        title: "Deep Learning & Backpropagation",
        status: "completed",
        level: "Core Core",
        hours: "12 hrs",
        topicId: "neural-networks",
        description: "Implement multi-layer perceptrons, forward/backward passes, and activation mechanics.",
        skills: ["Backprop", "Loss Functions", "PyTorch Tensors"]
      },
      {
        id: "m4",
        title: "Convolutional & Recurrent Networks",
        status: "in-progress",
        level: "Specialization",
        hours: "10 hrs",
        topicId: null,
        description: "Spatial feature kernels, padding/stride, vanishing gradients in RNNs, and LSTMs.",
        skills: ["Conv2D", "Pooling", "Sequential Memory"]
      },
      {
        id: "m5",
        title: "Transformer Architectures & Self-Attention",
        status: "locked",
        level: "Advanced",
        hours: "14 hrs",
        topicId: null,
        description: "Multi-head attention mechanisms, positional encodings, KV caching, and LLM fine-tuning.",
        skills: ["Self-Attention", "Rotary Embeddings", "LoRA Fine-tuning"]
      },
      {
        id: "m6",
        title: "Production ML Systems & MLOps",
        status: "locked",
        level: "Production Capstone",
        hours: "8 hrs",
        topicId: null,
        description: "Model quantization (GGUF, AWQ), latency optimization, vector databases, and evaluation.",
        skills: ["vLLM Serving", "Quantization", "Vector RAG"]
      }
    ]
  },
  {
    id: "quantum-foundations",
    title: "Quantum Computing & Information Theory",
    description: "Quantum mechanics principles applied to algorithms, cryptography, and quantum circuit simulation.",
    totalModules: 5,
    completedModules: 1,
    estimatedTotalHours: 32,
    milestones: [
      {
        id: "qm1",
        title: "Qubits, Bloch Sphere & Superposition",
        status: "completed",
        level: "Fundamentals",
        hours: "6 hrs",
        topicId: "quantum-computing",
        description: "State vectors, complex amplitudes, Pauli matrices, and Hadamard gates.",
        skills: ["Bloch Sphere", "State Vectors", "Hadamard"]
      },
      {
        id: "qm2",
        title: "Multi-Qubit Systems & Entanglement",
        status: "in-progress",
        level: "Core",
        hours: "8 hrs",
        topicId: "quantum-computing",
        description: "Tensor product Hilbert spaces, CNOT gates, Bell state creation, and no-cloning theorem.",
        skills: ["Bell States", "Entanglement", "CNOT Circuits"]
      },
      {
        id: "qm3",
        title: "Quantum Algorithms: Deutsch-Jozsa & Grover",
        status: "locked",
        level: "Algorithms",
        hours: "10 hrs",
        topicId: null,
        description: "Phase kickback, quantum oracles, amplitude amplification, and quadratic search speedup.",
        skills: ["Grover Search", "Phase Oracle", "Diffusion Operator"]
      },
      {
        id: "qm4",
        title: "Shor's Algorithm & Quantum Cryptography",
        status: "locked",
        level: "Advanced",
        hours: "12 hrs",
        topicId: null,
        description: "Quantum Fourier Transform (QFT), modular exponentiation, and period finding.",
        skills: ["Quantum Fourier Transform", "Period Finding", "QKD / BB84"]
      }
    ]
  },
  {
    id: "molecular-biology",
    title: "Cellular Bioenergetics & Synthetic Biology",
    description: "Investigate biological energy transduction, CRISPR gene editing, and metabolic pathways.",
    totalModules: 4,
    completedModules: 2,
    estimatedTotalHours: 25,
    milestones: [
      {
        id: "bm1",
        title: "Photosynthesis & Cellular Respiration",
        status: "completed",
        level: "Core Bioenergetics",
        hours: "6 hrs",
        topicId: "photosynthesis",
        description: "Light reactions, Calvin cycle, glycolysis, and chemiosmotic ATP synthesis.",
        skills: ["ATP Synthase", "Electron Transport", "RuBisCO"]
      },
      {
        id: "bm2",
        title: "Macromolecules, DNA & Protein Folding",
        status: "completed",
        level: "Molecular Systems",
        hours: "8 hrs",
        topicId: null,
        description: "Nucleic acids, transcription, translation, and thermodynamic folding landscapes.",
        skills: ["Ribosome Mechanics", "AlphaFold Insights", "Amino Chains"]
      },
      {
        id: "bm3",
        title: "Gene Expression & Epigenetics",
        status: "in-progress",
        level: "Genomics",
        hours: "7 hrs",
        topicId: null,
        description: "Operons, transcription factors, histone methylation, and chromatin remodeling.",
        skills: ["Promoter Regulation", "Chromatin", "siRNA Silencing"]
      },
      {
        id: "bm4",
        title: "CRISPR-Cas9 & Genome Engineering",
        status: "locked",
        level: "Biotech Frontier",
        hours: "9 hrs",
        topicId: null,
        description: "Guide RNA design, PAM sequence recognition, non-homologous end joining, and base editing.",
        skills: ["Cas9 Nuclease", "sgRNA Synthesis", "Base Editing"]
      }
    ]
  }
];

export const userProfileStats = {
  name: "Alex Rivera",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  institution: "Computer Science & Cognitive Tech",
  currentStreakDays: 7,
  totalHoursStudied: 31.4,
  visualCardsMastered: 148,
  quizAccuracyAvg: 92,
  weeklyGoalHours: 10,
  weeklyHoursLogged: 7.8,
  activityHistory: [
    { day: "Mon", hours: 1.5, cards: 22 },
    { day: "Tue", hours: 2.1, cards: 35 },
    { day: "Wed", hours: 1.2, cards: 18 },
    { day: "Thu", hours: 0.8, cards: 14 },
    { day: "Fri", hours: 1.9, cards: 29 },
    { day: "Sat", hours: 2.4, cards: 38 },
    { day: "Sun", hours: 1.5, cards: 20 },
  ],
  subjectMastery: [
    { subject: "Deep Learning & AI", score: 94, color: "blue" },
    { subject: "Quantum Computing", score: 76, color: "purple" },
    { subject: "Bioenergetics", score: 88, color: "emerald" },
    { subject: "Calculus & Math", score: 96, color: "indigo" },
    { subject: "Computer Systems", score: 82, color: "cyan" }
  ],
  recentActivities: [
    {
      id: "act-1",
      title: "Completed Neural Networks Quiz",
      time: "2 hours ago",
      type: "quiz",
      score: "100%",
      topic: "Neural Networks & Backpropagation"
    },
    {
      id: "act-2",
      title: "Explored 4 Visual Cards in High-School Mode",
      time: "5 hours ago",
      type: "visual",
      score: "+4 Mastered",
      topic: "Photosynthesis & Cellular Respiration"
    },
    {
      id: "act-3",
      title: "Unlocked Milestone 3 in AI Engineer Roadmap",
      time: "Yesterday",
      type: "roadmap",
      score: "Completed",
      topic: "Deep Learning & Backpropagation"
    },
    {
      id: "act-4",
      title: "Uploaded Lecture Notes: 'Quantum Superposition.pdf'",
      time: "2 days ago",
      type: "upload",
      score: "Processed",
      topic: "Quantum Superposition & Qubits"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Visual Thinker",
      description: "Interacted with 100+ visual explanation cards.",
      icon: "Eye",
      unlocked: true,
      date: "Oct 2026"
    },
    {
      id: "ach-2",
      title: "7-Day Streak Master",
      description: "Studied consecutively for a full week.",
      icon: "Flame",
      unlocked: true,
      date: "Oct 2026"
    },
    {
      id: "ach-3",
      title: "Perfectionist (100% Quiz)",
      description: "Achieved a flawless score on an advanced quiz.",
      icon: "Award",
      unlocked: true,
      date: "Oct 2026"
    },
    {
      id: "ach-4",
      title: "ELI5 Translator",
      description: "Switched simplification modes 25 times to master analogies.",
      icon: "Sparkles",
      unlocked: true,
      date: "Sep 2026"
    },
    {
      id: "ach-5",
      title: "Roadmap Pioneer",
      description: "Completed your first comprehensive career learning milestone.",
      icon: "Milestone",
      unlocked: false,
      date: "In Progress"
    }
  ]
};
