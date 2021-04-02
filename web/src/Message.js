import Badge from 'react-bootstrap/Badge';
import { Emoji } from 'emoji-mart'

import './Message.css';

export default function Message({name, emojis, me}) {
  return (
    <div className={me ? 'message me' : 'message'}>
      <div>
        <Badge pill variant={me ? 'primary' : 'success'}>{name}</Badge>
      </div>
      <div className="emojis">
        {emojis.map((emoji, idx) => <Emoji key={idx} emoji={emoji} size={18} />)}
      </div>
    </div>
  );
} 