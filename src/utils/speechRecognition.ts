/**
 * Browser Speech Recognition Helper for Feynman Mode
 * Detects whether the current browser supports SpeechRecognition or webkitSpeechRecognition.
 * Provides fallback text messaging when unsupported.
 */

// Declare browser SpeechRecognition types for TypeScript
interface IWindowWithSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as IWindowWithSpeech;
  return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
}

export function getSpeechRecognitionSupportNotice(): {
  supported: boolean;
  message: string;
} {
  const supported = isSpeechRecognitionSupported();
  if (supported) {
    return {
      supported: true,
      message: 'Voice input active via Web Speech API (Chrome, Edge, Safari supported).'
    };
  }
  return {
    supported: false,
    message: 'Speech recognition is not natively supported in this browser. Please use text input.'
  };
}

export interface SpeechRecognitionController {
  start: (onTranscript: (text: string, isFinal: boolean) => void, onError: (err: string) => void) => void;
  stop: () => void;
  isListening: () => boolean;
}

export function createSpeechRecognitionController(): SpeechRecognitionController | null {
  if (!isSpeechRecognitionSupported()) return null;

  const win = window as IWindowWithSpeech;
  const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

  try {
    const recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let listening = false;

    return {
      start: (onTranscript, onError) => {
        if (listening) return;

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          if (finalTranscript) {
            onTranscript(finalTranscript, true);
          } else if (interimTranscript) {
            onTranscript(interimTranscript, false);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('[SpeechRecognition] error:', event.error);
          listening = false;
          onError(event.error === 'not-allowed'
            ? 'Microphone permission was denied.'
            : `Voice error: ${event.error}`);
        };

        recognition.onend = () => {
          listening = false;
        };

        try {
          recognition.start();
          listening = true;
        } catch (e: any) {
          onError(e.message || 'Could not start voice recognition.');
        }
      },

      stop: () => {
        if (listening) {
          try {
            recognition.stop();
          } catch {
            // ignore
          }
          listening = false;
        }
      },

      isListening: () => listening
    };
  } catch (err) {
    console.warn('[createSpeechRecognitionController] initialization failed:', err);
    return null;
  }
}
