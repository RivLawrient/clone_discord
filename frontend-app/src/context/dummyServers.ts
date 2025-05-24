// import { Users, Chat, Server } from "./serverContext";

// // Helper function to generate random dates within the last year
// const getRandomDate = (months = 12) => {
//   const date = new Date();
//   date.setMonth(date.getMonth() - Math.floor(Math.random() * months));
//   date.setDate(Math.floor(Math.random() * 28) + 1);
//   date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
//   return date.toISOString();
// };

// // Generate random invite code
// const generateInviteCode = () => {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < 8; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// };

// // Sample users data for chat messages
// const sampleUsers: Users[] = [
//   {
//     id: "u1",
//     username: "techguru42",
//     display_name: "Tech Guru",
//     picture: "https://randomuser.me/api/portraits/men/1.jpg",
//     last_active: Date.now() - 1000 * 60 * 5, // 5 minutes ago
//     is_online: true,
//   },
//   {
//     id: "u2",
//     username: "codewarrior",
//     display_name: "Code Warrior",
//     picture: "https://randomuser.me/api/portraits/women/2.jpg",
//     last_active: Date.now(),
//     is_online: true,
//   },
//   {
//     id: "u3",
//     username: "pixelartist",
//     display_name: "Pixel Artist",
//     picture: "https://randomuser.me/api/portraits/men/3.jpg",
//     last_active: Date.now() - 1000 * 60 * 60, // 1 hour ago
//     is_online: false,
//   },
//   {
//     id: "u4",
//     username: "devqueen",
//     display_name: "Developer Queen",
//     picture: "https://randomuser.me/api/portraits/women/4.jpg",
//     last_active: Date.now() - 1000 * 60 * 30, // 30 minutes ago
//     is_online: true,
//   },
//   {
//     id: "u5",
//     username: "gamerjoe",
//     display_name: "Gamer Joe",
//     picture: "https://randomuser.me/api/portraits/men/5.jpg",
//     last_active: Date.now() - 1000 * 60 * 120, // 2 hours ago
//     is_online: false,
//   },
// ];

// // Sample chat messages
// const generateChatMessages = (channelId: string, count = 5): Chat[] => {
//   const messages: Chat[] = [];
//   for (let i = 0; i < count; i++) {
//     const randomUser =
//       sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
//     const date = getRandomDate(1); // Messages from the last month
//     messages.push({
//       id: `chat-${channelId}-${i}`,
//       user: randomUser,
//       message: `This is a sample message ${i + 1} in channel ${channelId}. Lorem ipsum dolor sit amet.`,
//       created_at: date,
//       updated_at: date,
//     });
//   }
//   return messages;
// };

// // Create dummy servers data
// export const dummyServers: Server[] = [
//   {
//     id: "server-1",
//     name: "Gaming Hub",
//     picture: "https://picsum.photos/200/200?random=1",
//     description:
//       "A place for gamers to connect, share tips, and find teammates for your favorite games.",
//     is_private: false,
//     role: "admin",
//     invite_code: generateInviteCode(),
//     member: 1248,
//     members: [],
//     created_at: getRandomDate(10),
//     updated_at: getRandomDate(2),
//     channel: [
//       {
//         id: "channel-1-1",
//         name: "general",
//         created_at: getRandomDate(9),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//       {
//         id: "channel-1-2",
//         name: "strategy-games",
//         created_at: getRandomDate(8),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//       {
//         id: "channel-1-3",
//         name: "fps-games",
//         created_at: getRandomDate(6),
//         updated_at: getRandomDate(3),
//         chat: [],
//       },
//     ],
//     voice: [
//       {
//         id: "voice-1-1",
//         name: "Game Chat",
//         created_at: getRandomDate(9),
//         updated_at: getRandomDate(3),
//       },
//       {
//         id: "voice-1-2",
//         name: "Strategy Room",
//         created_at: getRandomDate(8),
//         updated_at: getRandomDate(2),
//       },
//     ],
//   },
//   {
//     id: "server-2",
//     name: "Developers Corner",
//     picture: "https://picsum.photos/200/200?random=2",
//     description:
//       "A collaborative space for developers to share knowledge, resources, and help each other with coding challenges.",
//     is_private: true,
//     role: "moderator",
//     invite_code: generateInviteCode(),
//     member: 745,
//     members: [],
//     created_at: getRandomDate(24),
//     updated_at: getRandomDate(1),
//     channel: [
//       {
//         id: "channel-2-1",
//         name: "introductions",
//         created_at: getRandomDate(23),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//       {
//         id: "channel-2-2",
//         name: "frontend",
//         created_at: getRandomDate(22),
//         updated_at: getRandomDate(2),
//         chat: [],
//       },
//       {
//         id: "channel-2-3",
//         name: "backend",
//         created_at: getRandomDate(22),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//       {
//         id: "channel-2-4",
//         name: "devops",
//         created_at: getRandomDate(20),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//     ],
//     voice: [
//       {
//         id: "voice-2-1",
//         name: "Code Reviews",
//         created_at: getRandomDate(23),
//         updated_at: getRandomDate(2),
//       },
//       {
//         id: "voice-2-2",
//         name: "Pair Programming",
//         created_at: getRandomDate(20),
//         updated_at: getRandomDate(3),
//       },
//       {
//         id: "voice-2-3",
//         name: "Tech Discussions",
//         created_at: getRandomDate(15),
//         updated_at: getRandomDate(1),
//       },
//     ],
//   },
//   {
//     id: "server-3",
//     name: "Anime Fans",
//     picture: "https://picsum.photos/200/200?random=3",
//     description:
//       "A community for anime enthusiasts to discuss latest shows, share artwork, and organize watch parties.",
//     is_private: false,
//     role: "member",
//     invite_code: generateInviteCode(),
//     member: 3256,
//     members: [],
//     created_at: getRandomDate(15),
//     updated_at: getRandomDate(1),
//     channel: [
//       {
//         id: "channel-3-1",
//         name: "anime-news",
//         created_at: getRandomDate(15),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//       {
//         id: "channel-3-2",
//         name: "recommendations",
//         created_at: getRandomDate(14),
//         updated_at: getRandomDate(2),
//         chat: [],
//       },
//       {
//         id: "channel-3-3",
//         name: "fan-art",
//         created_at: getRandomDate(13),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//     ],
//     voice: [
//       {
//         id: "voice-3-1",
//         name: "Watch Party",
//         created_at: getRandomDate(14),
//         updated_at: getRandomDate(1),
//       },
//     ],
//   },
//   {
//     id: "server-4",
//     name: "Startup Incubator",
//     picture: "https://picsum.photos/200/200?random=4",
//     description:
//       "A networking space for entrepreneurs to share ideas, find co-founders, and get feedback on startup concepts.",
//     is_private: true,
//     role: "admin",
//     invite_code: generateInviteCode(),
//     member: 486,
//     members: [],
//     created_at: getRandomDate(18),
//     updated_at: getRandomDate(3),
//     channel: [
//       {
//         id: "channel-4-1",
//         name: "introductions",
//         created_at: getRandomDate(18),
//         updated_at: getRandomDate(3),
//         chat: [],
//       },
//       {
//         id: "channel-4-2",
//         name: "funding-opportunities",
//         created_at: getRandomDate(17),
//         updated_at: getRandomDate(2),
//         chat: [],
//       },
//       {
//         id: "channel-4-3",
//         name: "mvp-showcase",
//         created_at: getRandomDate(16),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//       {
//         id: "channel-4-4",
//         name: "tech-stack",
//         created_at: getRandomDate(15),
//         updated_at: getRandomDate(2),
//         chat: [],
//       },
//       {
//         id: "channel-4-5",
//         name: "marketing",
//         created_at: getRandomDate(14),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//     ],
//     voice: [
//       {
//         id: "voice-4-1",
//         name: "Pitch Practice",
//         created_at: getRandomDate(17),
//         updated_at: getRandomDate(3),
//       },
//       {
//         id: "voice-4-2",
//         name: "Mentor Sessions",
//         created_at: getRandomDate(16),
//         updated_at: getRandomDate(2),
//       },
//     ],
//   },
//   {
//     id: "server-5",
//     name: "Design Collective",
//     picture: "https://picsum.photos/200/200?random=5",
//     description:
//       "A creative community for designers to share work, get feedback, and collaborate on projects.",
//     is_private: false,
//     role: "moderator",
//     invite_code: generateInviteCode(),
//     member: 912,
//     members: [],
//     created_at: getRandomDate(12),
//     updated_at: getRandomDate(1),
//     channel: [
//       {
//         id: "channel-5-1",
//         name: "showcase",
//         created_at: getRandomDate(12),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//       {
//         id: "channel-5-2",
//         name: "ui-design",
//         created_at: getRandomDate(11),
//         updated_at: getRandomDate(2),
//         chat: [],
//       },
//       {
//         id: "channel-5-3",
//         name: "illustration",
//         created_at: getRandomDate(10),
//         updated_at: getRandomDate(1),
//         chat: [],
//       },
//       {
//         id: "channel-5-4",
//         name: "resources",
//         created_at: getRandomDate(9),
//         updated_at: getRandomDate(3),
//         chat: [],
//       },
//     ],
//     voice: [
//       {
//         id: "voice-5-1",
//         name: "Design Critiques",
//         created_at: getRandomDate(11),
//         updated_at: getRandomDate(2),
//       },
//       {
//         id: "voice-5-2",
//         name: "Collaborative Work",
//         created_at: getRandomDate(10),
//         updated_at: getRandomDate(1),
//       },
//       {
//         id: "voice-5-3",
//         name: "Tool Tips & Tricks",
//         created_at: getRandomDate(8),
//         updated_at: getRandomDate(3),
//       },
//     ],
//   },
// ];

// // Add chat messages to each channel
// dummyServers.forEach((server) => {
//   server.channel.forEach((channel) => {
//     // @ts-ignore - Workaround for the type definition
//     channel.chat = generateChatMessages(
//       channel.id,
//       Math.floor(Math.random() * 10) + 3,
//     );
//   });
// });

// export default dummyServers;
