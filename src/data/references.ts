/**
 * Research references, grouped as in the source deck.
 *
 * LINK ACCURACY NOTE
 * ------------------
 * Entries marked `exact: true` point at the canonical primary source and are safe as-is.
 * Entries marked `exact: false` currently point at a targeted search on the publishing
 * body's own site, because the deck's precise deep-link wasn't available when this was
 * built. Paste the exact URL from the deck over the `url` field and flip `exact` to true.
 */

export interface Reference {
  id: string
  title: string
  detail: string
  url: string
  /** false = placeholder search link, replace with the deck's exact URL. */
  exact: boolean
}

export interface ReferenceGroup {
  id: string
  title: string
  description: string
  icon: string
  items: Reference[]
}

export const REFERENCE_GROUPS: ReferenceGroup[] = [
  {
    id: 'technology-foundation',
    title: 'Technology Foundation',
    description: 'The models, tooling and deployment stack VISTASpace is built on.',
    icon: 'Cpu',
    items: [
      {
        id: 'physastro-pose',
        title: 'PhysAstro-Pose',
        detail: 'Pose estimation for astronaut body tracking under microgravity conditions.',
        url: 'https://arxiv.org/search/?query=PhysAstro-Pose&searchtype=all',
        exact: false,
      },
      {
        id: 'stgcn',
        title: 'ST-GCN — Spatial Temporal Graph Convolutional Networks',
        detail: 'Yan et al., 2018. arXiv:1801.07455. Basis for the planned skeleton-stream upgrade.',
        url: 'https://arxiv.org/abs/1801.07455',
        exact: true,
      },
      {
        id: 'tensorrt-int8',
        title: 'NVIDIA TensorRT — INT8 Quantization',
        detail: 'Post-training quantization used to fit the pipeline into the Jetson compute budget.',
        url: 'https://docs.nvidia.com/deeplearning/tensorrt/latest/inference-library/work-quantized-types.html',
        exact: true,
      },
      {
        id: 'deepstream',
        title: 'NVIDIA DeepStream SDK',
        detail: 'Streaming analytics toolkit for multi-stream edge video inference.',
        url: 'https://developer.nvidia.com/deepstream-sdk',
        exact: true,
      },
    ],
  },
  {
    id: 'problem-validation',
    title: 'Problem Validation',
    description: 'Published evidence that on-board procedural error is a real, measured risk.',
    icon: 'FileSearch',
    items: [
      {
        id: 'iss-command-errors',
        title: 'NASA ISS Command-Error Study',
        detail: '414 recorded command errors — 22% cognitive overload, 21% time pressure.',
        url: 'https://ntrs.nasa.gov/search?q=ISS%20crew%20command%20error',
        exact: false,
      },
      {
        id: 'comm-delay-2025',
        title: 'NASA Communication Delay Assessment (2025)',
        detail: 'Crew performance drops sharply past a 4–8 second delay, forcing crew autonomy.',
        url: 'https://ntrs.nasa.gov/search?q=communication%20delay%20crew%20performance',
        exact: false,
      },
      {
        id: 'frontiers-cognition',
        title: 'Frontiers in Physiology — ISS Cognitive Performance (2024)',
        detail: 'Attention and working memory dip early-flight, raising error risk.',
        url: 'https://www.frontiersin.org/journals/physiology/search?query=spaceflight%20cognitive%20performance',
        exact: false,
      },
    ],
  },
  {
    id: 'dataset-links',
    title: 'Dataset Links',
    description: 'Earth-based and synthetic microgravity sources used for training and validation.',
    icon: 'Database',
    items: [
      {
        id: 'coco',
        title: 'COCO — Common Objects in Context',
        detail: 'Object detection and keypoint baseline for the YOLO perception layer.',
        url: 'https://cocodataset.org/',
        exact: true,
      },
      {
        id: 'hagrid',
        title: 'HaGRID — Hand Gesture Recognition Image Dataset',
        detail: 'Large-scale hand gesture data supporting the MediaPipe hand-tracking stage.',
        url: 'https://github.com/hukenovs/hagrid',
        exact: true,
      },
      {
        id: 'microg-4m',
        title: 'MicroG-4M',
        detail: 'Microgravity video understanding dataset for zero-G activity recognition.',
        url: 'https://arxiv.org/search/?query=MicroG-4M&searchtype=all',
        exact: false,
      },
      {
        id: 'roboflow',
        title: 'Roboflow',
        detail: 'Annotation and dataset management for the custom experiment-object classes.',
        url: 'https://roboflow.com/',
        exact: true,
      },
    ],
  },
]
