declare global {
    interface Window {
      voiceflow: {
        chat: {
          [x: string]: any;
          load: (config: { verify: { projectID: string }; url: string; versionID: string }) => void;
        };
      };
    }
  }
  
  export {};
  