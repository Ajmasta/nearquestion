import React, { useState } from "react";
import PropTypes from "prop-types";
import Big from "big.js";

export default function Messages({ messages, answer, answers }) {
  const [checkAnswer, setCheckAnswer] = useState([]);
  const [answerInput, setAnswerInput] = useState([]);
  const [answerText, setAnswerText] = useState([]);
  return (
    <>
      <h2>Messages</h2>
      {messages.map((message, i) => (
        // TODO: format as cards, add timestamp
        <>
          <p key={i} className={message.premium ? "is-premium" : ""}>
            <strong>{message.sender}</strong>:<br />
            <strong>Question:</strong> {message.text}
            {console.log(message)}
            <br />
            <strong>Reward:</strong> {(message.fee / 10 ** 24).toFixed(3)}
            <br />
            <button
              onClick={() => {
                setAnswerInput([i]);
              }}
            >
              Answer
            </button>
            <button
              onClick={() => {
                setAnswerText("");
                const index = checkAnswer.indexOf(i);
                const newArray = [...checkAnswer];
                newArray.splice(index, 1);
                !checkAnswer.includes(i)
                  ? setCheckAnswer([...checkAnswer, i])
                  : setCheckAnswer(newArray);
              }}
            >
              Check Answers
            </button>
          </p>
          {answerInput.includes(i) ? (
            <>
              {" "}
              <input
                style={{ border: "1px solid #eee" }}
                type="text"
                placeholder={"Type your answer!"}
                onChange={(e) => setAnswerText(e.target.value)}
              />{" "}
              <button
                onClick={() => {
                  answer(message.uuid, answerText);
                }}
              >
                {" "}
                Send{" "}
              </button>
            </>
          ) : (
            ""
          )}
          {checkAnswer.includes(i)
            ? answers.map((answer) => {
                const answersToQuestion = answers.filter(
                  (answer) => answer.uuid === message.uuid
                );
                if (answer.uuid === message.uuid) {
                  return (
                    <div
                      style={{
                        boxShadow: "2px 2px 2px black",
                        padding: "10px 0",
                      }}
                    >
                      <p>{answer.link}</p>{" "}
                      <p
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        Author: {answer.sender}
                      </p>
                    </div>
                  );
                }
                if (answersToQuestion.length === 0) {
                  return "No answer!";
                }

                return "";
              })
            : ""}
        </>
      ))}
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array,
};
