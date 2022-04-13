import Prompt from "./Prompt.js";
import Story from "./Story.js";

const PROMPT_DATA_URL = "resources/prompt_json_data.json";

async function loadPromptFrom(url) {
  let raw = await fetch(url),
    json = await raw.json(),
    prompts = json.map((jsonPrompt) => new Prompt(jsonPrompt));
  return prompts;
}

class StoryService {

  async init() {
    let startTime = Date.now(),
      prompts = await loadPromptFrom(PROMPT_DATA_URL);
    this.prompts = prompts;
    return {
      numberOfPrompts: prompts.length,
      loadingTimeInMilliSeconds: Date.now() - startTime,
    };
  }

  async getRandomPrompt() {
    let randomPrompt = this.prompts[Math.floor(Math.random() * this.prompts.length)];
    return randomPrompt;
  }

  async createStory() {
      let prompt = await this.getRandomPrompt();
      return new Story(prompt);
  }

}

export default new StoryService();