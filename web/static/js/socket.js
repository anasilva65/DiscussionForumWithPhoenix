import {Socket} from "phoenix"
let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()
// Now that you are connected, you can join channels with a topic:
const createSocket = (topicId) =>
 {
let channel = socket.channel(`comments:${topicId}`, {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

  channel.on(`comments:${topicId}:new`, renderComment);
  
  document.querySelector('button').addEventListener('click', () => 
  {
    const content = document.querySelector('textarea').value;

    channel.push('comment:add', { content: content });
  });
};

function renderComments(comments) {
  const renderedComments = comments.map(comment => {
    return commentTemplate(comment);
  });

  document.querySelector('.collection').innerHTML = renderedComments.join('');
}

window.createSocket = createSocket;