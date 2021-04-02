import { Emoji } from 'emoji-mart'
import Button from 'react-bootstrap/Button';

import './EmojiInput.css';

export default function EmojiInput({emojis, onSubmit}) {
  return (
    <div id="emoji-input">
      <div id="emoji-input-display">
        {
          emojis && emojis.length
            ? emojis.map((emoji, idx) => <Emoji key={idx} emoji={emoji} size={18} />)
            : null
        }
      </div>
      <Button
        variant="primary"
        onClick={() => onSubmit()}
        disabled={emojis.length === 0}
      >Send</Button>
    </div>
  );
}
