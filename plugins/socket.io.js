import io from 'socket.io-client'
const socket = io(process.env.HOST_URL, { path: '/socket/socket.io' })

export default socket
