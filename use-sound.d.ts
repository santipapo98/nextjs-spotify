declare module 'use-sound' {
    export interface UseSoundObject {
      play: () => void;
      pause: () => void;
      sound: HTMLAudioElement | any;
    }
  
    function useSound(soundUrl: string, options: any): [() => void, UseSoundObject];
  
    export default useSound;
}