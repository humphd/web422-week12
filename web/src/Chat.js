import { useRef, useEffect } from 'react';

import Message from './Message';

export default function Chat({ messages }) {
  // We need a reference to the element that React will create to our messages <div>
  const messagesRef = useRef();

  // Whenever messages updates, scroll all the way to the bottom of this div
  useEffect(() => {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
    // The `false` arg means scroll to the bottom of the element.  We use
    // `messagesRef.current?` to indicate that we might not have an element (yet)
    // so bail stop if we don't.  See optional chaining operator,
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    messagesRef.current?.scrollIntoView(false);
  }, [messages]);

  return (
    <div id="messages" ref={messagesRef}>
      {
        messages && messages.map((message, idx) =>
          <Message key={idx} name={message.name} emojis={message.emojis} me={message.me} />
        )
      }
    </div>
  );
}
