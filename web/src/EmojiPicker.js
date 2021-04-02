import { Picker } from 'emoji-mart'
import EmojiInput from './EmojiInput';

import 'emoji-mart/css/emoji-mart.css'

export default function EmojiPicker({clients, emojis, onChange, onSubmit}) {
  return (
    <div>
      <EmojiInput emojis={emojis} onSubmit={onSubmit} />
      <div className="text-center">
        <Picker
          style={{ margin: '5px' }}
          title='Pick your emoji…'
          emoji='point_up'
          onClick={ (emoji) => onChange(emoji) }
        />
        <div className="text-center mb-2">
          <b>Emoji Chat</b> - <i>{clients} connected</i>
        </div>
      </div>
    </div>
  );
}
