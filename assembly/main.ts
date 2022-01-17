import { PostedMessage, messages, PostedAnswer, answers } from './model';

// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addQuestion(text: string, uuid:string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text, uuid);
  // Adding the message to end of the persistent collection
  messages.push(message);
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getQuestion(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;

 
}
export function getAnswers(): PostedAnswer[] {
  const numAnswers = min(MESSAGE_LIMIT, answers.length);
  const startIndex = answers.length - numAnswers;
  const result = new Array<PostedAnswer>(numAnswers);
  for(let i = 0; i < numAnswers; i++) {
    result[i] = answers[i + startIndex];
  }
  return result;
}

export function addAnswer(uuid:string, link:string): void {
  const answer = new PostedAnswer(uuid,link)
  answers.push(answer)
}