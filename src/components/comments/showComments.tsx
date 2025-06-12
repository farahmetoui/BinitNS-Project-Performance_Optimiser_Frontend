
import { useEffect, useState } from "react";
import { getComments } from "../../services/commentService";
import { ArrowLeftIcon, ClockIcon, MessageSquareIcon, SearchIcon } from "../../pages/Icons";
import { Comments } from "../../interfaces/model";

const getTypeColor = (type: string) => {
  switch (type) {
    case "performance":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "accessibility":
      return "bg-green-100 text-green-800 border-green-200"
    case "seo":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "bug":
      return "bg-red-100 text-red-800 border-red-200"
    case "suggestion":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}
interface TestCommentsProps {
  id: string;
  setVisible: (visible: boolean) => void;
}

export default function TestComments({ id , setVisible }: TestCommentsProps) {
const [commentFilter, setCommentFilter] = useState("all")
const [searchQuery, setSearchQuery] = useState("")
  
const [comments, setComments] = useState<Comments[]>([]);

 useEffect(() => {
   const fetchComments = async () => {
      const Allcomments = await getComments(id);
      setComments(Allcomments.comments);
    };

    fetchComments();
  }, [id]);
   

 
const filteredComments =
   comments.filter((comment) => {
      const matchesFilter = commentFilter === "all" || comment.type === commentFilter
      const matchesSearch =
        comment.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.author.userName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    }) || []

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">

           <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setVisible(false)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ArrowLeftIcon />
                Back to Tests
              </button>
             
          </div></div>
          {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <div className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Total Comments: {comments.length}</span>
                <span>Showing: {filteredComments.length}</span>
              </div>
            </div>
          </div>
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    
                    <input
                      type="text"
                      placeholder="Search comments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <SearchIcon />
                    </div>
                  </div>
                </div>
                <select
                  value={commentFilter}
                  onChange={(e) => setCommentFilter(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="performance">Performance</option>
                  <option value="accessibility">Accessibility</option>
                  <option value="seo">SEO</option>
                  <option value="bug">Bug</option>
                  <option value="suggestion">Suggestion</option>
                </select>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {filteredComments.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-8 text-center">
                  <div className="w-12 h-12 text-gray-400 mx-auto mb-4">
                    <MessageSquareIcon />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No comments found</h3>
                  <p className="text-gray-600">
                    {searchQuery || commentFilter !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "Be the first to add a comment to this test."}
                  </p>
                </div>
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium">
                        {comment.author.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900">{comment.author.userName}</span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-md border ${getTypeColor(comment.type)}`}
                            >
                              {comment.type}
                            </span>
                            {comment.priority && (
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(comment.priority)}`} />
                                <span className="text-xs text-gray-500 capitalize">{comment.priority}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <ClockIcon />
                            {comment.timestamp}
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">{comment.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div> 
           </div>

             
            </div> )}
