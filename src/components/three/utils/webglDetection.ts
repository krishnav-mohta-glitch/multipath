/**
 * MULTIPATH V2 — WebGL Capability & Graphics Context Detection
 * Validates that WebGL/WebGL2 can not only be queried but successfully initialized.
 */

export interface WebGLSupportResult {
  supported: boolean;
  version: 1 | 2 | 0;
  renderer?: string;
  error?: string;
}

let cachedResult: WebGLSupportResult | null = null;

export function detectWebGLSupport(): WebGLSupportResult {
  if (cachedResult !== null) {
    return cachedResult;
  }

  // Check for window/canvas availability (SSR safe)
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { supported: false, version: 0, error: 'SSR environment - window not defined' };
  }

  // Allow explicit testing/override of 2D fallback via URL query parameter
  if (window.location.search.includes('force2d=1') || window.location.search.includes('webgl=0')) {
    return { supported: false, version: 0, error: 'User forced 2D fallback mode via URL parameter' };
  }

  try {
    const canvas = document.createElement('canvas');
    // Try WebGL2 first, then fallback to WebGL1
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2');
    let version: 1 | 2 = 2;

    if (!gl) {
      gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      version = 1;
    }

    if (!gl) {
      cachedResult = {
        supported: false,
        version: 0,
        error: 'WebGL context creation failed on experimental-webgl, webgl, and webgl2'
      };
      return cachedResult;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Generic WebGL';

    // Clean up temporary context resources
    const loseContextExt = gl.getExtension('WEBGL_lose_context');
    if (loseContextExt) {
      loseContextExt.loseContext();
    }

    cachedResult = {
      supported: true,
      version,
      renderer: typeof renderer === 'string' ? renderer : 'Generic WebGL'
    };
    return cachedResult;
  } catch (err) {
    cachedResult = {
      supported: false,
      version: 0,
      error: err instanceof Error ? err.message : 'Unknown WebGL initialization failure'
    };
    return cachedResult;
  }
}
