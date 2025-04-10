import { PlusCircle, MessageSquare, Settings, LogOut } from "lucide-react"

interface SidebarProps {
    isSidebarOpen: boolean
    setIsSidebarOpen: (isOpen: boolean) => void
    pastConversations: Array<{
        id: number
        title: string
        date: string
    }>
}

export function Sidebar({isSidebarOpen, pastConversations} : SidebarProps) {
    return (

        <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}>
        {/* New Chat Button */}
        <button className="flex items-center space-x-2 p-4 border border-gray-700 rounded-md m-3 hover:bg-gray-800">
            <PlusCircle size={18} />
            <span>New Chat</span>
        </button>
        
        {/* Past Conversations */}
        <div className="flex-1 overflow-y-auto">
            <div className="p-2">
            <h2 className="px-3 py-2 text-sm text-gray-400 font-medium">Previous Chats</h2>
            <ul>
                {pastConversations.map(convo => (
                <li key={convo.id} className="px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                    <div className="flex items-center space-x-3">
                    <MessageSquare size={18} className="text-gray-400" />
                    <div className="flex-1 truncate">
                        <span className="block">{convo.title}</span>
                        <span className="text-xs text-gray-500">{convo.date}</span>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        </div>
        
        {/* User Section */}
        <div className="p-3 border-t border-gray-700">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-medium">U</span>
            </div>
            <span className="flex-1">User Account</span>
            </div>
            <div className="mt-2 space-y-1">
            <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-md text-left">
                <Settings size={18} />
                <span>Settings</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-md text-left">
                <LogOut size={18} />
                <span>Log out</span>
            </button>
            </div>
        </div>
        </div>
    )
}