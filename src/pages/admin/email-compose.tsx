import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaArrowLeft,
  FaPaperPlane,
  FaTimes,
  FaUser,
  FaPlus,
  FaPaperclip,
  FaTrash,
  FaFont,
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaImage,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaUndo,
  FaRedo,
  FaEye,
  FaSave,
  FaClock,
  FaExclamationCircle,
  FaCheck,
  FaFileAlt,
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileExcel,
} from "react-icons/fa";

const EmailCompose = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    message: "",
    attachments: [],
  });
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [templates, setTemplates] = useState([
    { id: 1, name: "Welcome Email", subject: "Welcome to our platform!" },
    {
      id: 2,
      name: "Order Confirmation",
      subject: "Your order has been confirmed",
    },
    { id: 3, name: "Password Reset", subject: "Reset your password" },
    {
      id: 4,
      name: "Promotional Offer",
      subject: "Special offer just for you!",
    },
  ]);
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock user data
  const user = {
    id: parseInt(id || "1"),
    name: "John Smith",
    email: "john.smith@example.com",
    profileImage: null,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setEmailData({
      ...emailData,
      attachments: [...emailData.attachments, ...newAttachments],
    });
  };

  const removeAttachment = (id) => {
    setEmailData({
      ...emailData,
      attachments: emailData.attachments.filter(
        (attachment) => attachment.id !== id
      ),
    });
  };

  const applyTemplate = (template) => {
    setEmailData({
      ...emailData,
      subject: template.subject,
      message: `Dear ${user.name},\n\nThis is a template message for ${template.name}.\n\nBest regards,\nThe Team`,
    });
    setShowTemplates(false);
  };

  const handleSendEmail = () => {
    setIsSending(true);

    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      if (Math.random() > 0.1) {
        // 90% success rate for demo
        setSendSuccess(true);
        setTimeout(() => {
          navigate(`/admin/users/${id}`);
        }, 2000);
      } else {
        setSendError(true);
      }
    }, 2000);
  };

  const getFileIcon = (type) => {
    if (type.includes("pdf")) return <FaFilePdf />;
    if (type.includes("image")) return <FaFileImage />;
    if (type.includes("word")) return <FaFileWord />;
    if (type.includes("excel") || type.includes("sheet"))
      return <FaFileExcel />;
    return <FaFileAlt />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/admin/users/${id}`)}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
          >
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Back to User Profile</span>
          </button>

          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white/30">
                  <FaEnvelope />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">Compose Email</h1>
                  <p className="text-purple-100">
                    Send an email to {user.name}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center backdrop-blur-sm border border-white/20"
                >
                  <FaFileAlt className="mr-2" />
                  Templates
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center backdrop-blur-sm border border-white/20"
                >
                  <FaEye className="mr-2" />
                  {showPreview ? "Edit" : "Preview"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Email Compose Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {!showPreview ? (
            <div className="p-6">
              {/* Recipient Fields */}
              <div className="space-y-4">
                <div className="flex items-center border-b border-gray-200 pb-4">
                  <label
                    htmlFor="to"
                    className="w-20 text-gray-600 font-medium"
                  >
                    To:
                  </label>
                  <div className="flex-1 flex items-center">
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm font-medium flex items-center mr-2">
                      <FaUser className="mr-1 text-xs" />
                      {user.name}
                      <span className="text-purple-600 ml-1 cursor-pointer">
                        <FaTimes />
                      </span>
                    </div>
                    <input
                      type="text"
                      id="to"
                      name="to"
                      value={emailData.to}
                      onChange={handleInputChange}
                      placeholder="Add more recipients..."
                      className="flex-1 outline-none text-gray-800"
                    />
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      onClick={() => setShowCc(!showCc)}
                      className="text-sm text-gray-500 hover:text-purple-600"
                    >
                      Cc
                    </button>
                    <button
                      onClick={() => setShowBcc(!showBcc)}
                      className="text-sm text-gray-500 hover:text-purple-600"
                    >
                      Bcc
                    </button>
                  </div>
                </div>

                {showCc && (
                  <div className="flex items-center border-b border-gray-200 pb-4">
                    <label
                      htmlFor="cc"
                      className="w-20 text-gray-600 font-medium"
                    >
                      Cc:
                    </label>
                    <input
                      type="text"
                      id="cc"
                      name="cc"
                      value={emailData.cc}
                      onChange={handleInputChange}
                      placeholder="Carbon copy recipients..."
                      className="flex-1 outline-none text-gray-800"
                    />
                  </div>
                )}

                {showBcc && (
                  <div className="flex items-center border-b border-gray-200 pb-4">
                    <label
                      htmlFor="bcc"
                      className="w-20 text-gray-600 font-medium"
                    >
                      Bcc:
                    </label>
                    <input
                      type="text"
                      id="bcc"
                      name="bcc"
                      value={emailData.bcc}
                      onChange={handleInputChange}
                      placeholder="Blind carbon copy recipients..."
                      className="flex-1 outline-none text-gray-800"
                    />
                  </div>
                )}

                <div className="flex items-center border-b border-gray-200 pb-4">
                  <label
                    htmlFor="subject"
                    className="w-20 text-gray-600 font-medium"
                  >
                    Subject:
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={emailData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter email subject..."
                    className="flex-1 outline-none text-gray-800"
                  />
                </div>
              </div>

              {/* Rich Text Editor Toolbar */}
              <div className="border border-gray-200 rounded-lg mt-6 mb-4">
                <div className="flex flex-wrap items-center p-2 border-b border-gray-200 bg-gray-50">
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaFont />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaBold />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaItalic />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaUnderline />
                  </button>
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaListUl />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaListOl />
                  </button>
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaLink />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaImage />
                  </button>
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaAlignLeft />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaAlignCenter />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaAlignRight />
                  </button>
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaUndo />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded">
                    <FaRedo />
                  </button>
                </div>

                <textarea
                  name="message"
                  value={emailData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  className="w-full p-4 min-h-[300px] outline-none resize-none text-gray-800"
                ></textarea>
              </div>

              {/* Attachments */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                    <FaPaperclip className="mr-2 text-purple-600" />
                    Attachments
                  </h3>
                  <label className="cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                    <FaPlus className="mr-2" />
                    Add Files
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleAttachmentUpload}
                    />
                  </label>
                </div>

                {emailData.attachments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {emailData.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-200 rounded text-gray-600">
                            {getFileIcon(attachment.type)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800 truncate max-w-[150px]">
                              {attachment.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(attachment.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeAttachment(attachment.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <FaPaperclip className="mx-auto text-gray-300 text-3xl mb-2" />
                    <p className="text-gray-500">No attachments added yet</p>
                    <p className="text-gray-400 text-sm">
                      Click "Add Files" to attach documents
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-700 w-20">
                      To:
                    </span>
                    <span className="text-gray-800">
                      {user.name} &lt;{user.email}&gt;
                    </span>
                  </div>
                  {emailData.cc && (
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-gray-700 w-20">
                        Cc:
                      </span>
                      <span className="text-gray-800">{emailData.cc}</span>
                    </div>
                  )}
                  {emailData.bcc && (
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-gray-700 w-20">
                        Bcc:
                      </span>
                      <span className="text-gray-800">{emailData.bcc}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-20">
                      Subject:
                    </span>
                    <span className="text-gray-800 font-medium">
                      {emailData.subject || "(No subject)"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="prose max-w-none">
                    {emailData.message ? (
                      <div className="whitespace-pre-wrap">
                        {emailData.message}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        (No message content)
                      </p>
                    )}
                  </div>
                </div>

                {emailData.attachments.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <FaPaperclip className="mr-2" />
                      Attachments ({emailData.attachments.length})
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {emailData.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center bg-gray-50 p-2 rounded border border-gray-200"
                        >
                          {getFileIcon(attachment.type)}
                          <span className="ml-2 text-sm text-gray-800">
                            {attachment.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <button className="flex items-center text-gray-600 hover:text-purple-600 mr-4">
                <FaSave className="mr-1" />
                <span className="text-sm">Save Draft</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-purple-600">
                <FaClock className="mr-1" />
                <span className="text-sm">Schedule</span>
              </button>
            </div>
            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className={`px-6 py-3 rounded-lg text-white font-medium flex items-center ${
                isSending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              } transition-all duration-200`}
            >
              {isSending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send Email
                </>
              )}
            </button>
          </div>
        </div>

        {/* Templates Drawer */}
        {showTemplates && (
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-gray-200 z-40 transform transition-transform duration-300 ease-in-out">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-lg flex items-center">
                <FaFileAlt className="mr-2 text-purple-600" />
                Email Templates
              </h3>
              <button
                onClick={() => setShowTemplates(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-20">
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-colors duration-200"
                  >
                    <h4 className="font-medium text-gray-800">
                      {template.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {template.subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {sendSuccess && (
          <div className="fixed bottom-6 right-6 bg-emerald-100 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-lg shadow-lg flex items-center animate-slide-up">
            <div className="p-2 bg-emerald-200 rounded-full mr-3">
              <FaCheck className="text-emerald-600" />
            </div>
            <div>
              <p className="font-medium">Email sent successfully!</p>
              <p className="text-sm">
                Your message has been delivered to {user.name}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {sendError && (
          <div className="fixed bottom-6 right-6 bg-red-100 border border-red-200 text-red-800 px-6 py-4 rounded-lg shadow-lg flex items-center animate-slide-up">
            <div className="p-2 bg-red-200 rounded-full mr-3">
              <FaExclamationCircle className="text-red-600" />
            </div>
            <div>
              <p className="font-medium">Failed to send email</p>
              <p className="text-sm">Please try again or contact support</p>
            </div>
            <button
              onClick={() => setSendError(false)}
              className="ml-4 p-1 text-red-600 hover:text-red-800"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailCompose;
