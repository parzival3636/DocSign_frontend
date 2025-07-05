










// // import React, { useState, useRef, useEffect } from 'react';
// // import { Upload, FileText, User, Mail, Lock, Eye, EyeOff, Download, X, Edit3, Type, Trash2, Move, Check, PenTool, Plus, ChevronLeft, Clock, Calendar, Loader2 } from 'lucide-react';
// // import axios from 'axios';
// // import { PDFDocument} from 'pdf-lib';
// // // Add axios interceptor for auth
// // axios.interceptors.request.use(config => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // }, error => {
// //   return Promise.reject(error);
// // });
// // const DocumentSigningApp = () => {
// //   // Authentication state
// //   const [currentPage, setCurrentPage] = useState('home');
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [authForm, setAuthForm] = useState({
// //     name: '',
// //     email: '',
// //     password: ''
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [authError, setAuthError] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Document state
// //   const [uploadedFile, setUploadedFile] = useState(null);
// //   const [currentDocumentPage, setCurrentDocumentPage] = useState(1);
// //   const [documentPages, setDocumentPages] = useState([]);
// //   const [documentId, setDocumentId] = useState(null);
// //   const [documents, setDocuments] = useState([]);

// //   // Signature state
// //   const [signatures, setSignatures] = useState([]);
// //   const [draggedSignature, setDraggedSignature] = useState(null);
// //   const [documentSignatures, setDocumentSignatures] = useState([]);
// //   const [signatureFields, setSignatureFields] = useState([]);

// //   // Modals
// //   const [showSignatureModal, setShowSignatureModal] = useState(false);
// //   const [showDownloadModal, setShowDownloadModal] = useState(false);
// //   const [showSendModal, setShowSendModal] = useState(false);
// //   const [showDocumentsModal, setShowDocumentsModal] = useState(false);

// //   // Signature creation
// //   const [signatureType, setSignatureType] = useState('draw');
// //   const [signatureText, setSignatureText] = useState('');
// //   const [signatureFont, setSignatureFont] = useState('font-script');
// //   const [signatureColor, setSignatureColor] = useState('#000000');
// //   const canvasRef = useRef(null);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const fileInputRef = useRef(null);

// //   // Send form
// //   const [sendForm, setSendForm] = useState({
// //     recipientEmail: '',
// //     message: ''
// //   });

// //   // Font and color options
// //   const fonts = [
// //     { name: 'Script', class: 'font-script', style: { fontFamily: 'Dancing Script, cursive' } },
// //     { name: 'Elegant', class: 'font-elegant', style: { fontFamily: 'Great Vibes, cursive' } },
// //     { name: 'Classic', class: 'font-classic', style: { fontFamily: 'Playfair Display, serif' } },
// //     { name: 'Modern', class: 'font-modern', style: { fontFamily: 'Comfortaa, cursive' } }
// //   ];

// //   const colors = ['#000000', '#0066cc', '#009900', '#cc0000', '#800080'];

// //   // Handle file upload to backend
// //   const handleFileUpload = async (event) => {
// //     const file = event.target.files[0];
// //     if (file && file.type === 'application/pdf') {
// //       setIsLoading(true);
// //       try {
// //         const formData = new FormData();
// //         formData.append('document', file);

// //         const response = await axios.post('http://localhost:5000/api/documents/upload', formData, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data',
// //             'Authorization': `Bearer ${localStorage.getItem('token')}`
// //           }
// //         });

// //         setUploadedFile(file);
// //         setDocumentId(response.data.data.id);
// //         setCurrentPage('document');
        
// //         // Extract pages from PDF (simplified for demo)
// //         const pdfBytes = await file.arrayBuffer();
// //         const pdfDoc = await PDFDocument.load(pdfBytes);
// //         const pageCount = pdfDoc.getPageCount();
        
// //         setDocumentPages(Array.from({ length: pageCount }, (_, i) => ({
// //           id: i + 1,
// //           content: `Page ${i + 1} of ${file.name}`
// //         })));
        
// //         // Fetch signatures for this user
// //         await fetchUserSignatures();
// //       } catch (error) {
// //         console.error('Upload error:', error);
// //         setAuthError(error.response?.data?.message || 'Upload failed');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }
// //   };

// //   // Handle drag and drop for file upload
// //   const handleDragOver = (event) => {
// //     event.preventDefault();
// //   };

// //   const handleDrop = (event) => {
// //     event.preventDefault();
// //     const files = event.dataTransfer.files;
// //     if (files.length > 0 && files[0].type === 'application/pdf') {
// //       handleFileUpload({ target: { files } });
// //     }
// //   };

// //   // Signature drawing functions
// //   const startDrawing = (event) => {
// //     setIsDrawing(true);
// //     const canvas = canvasRef.current;
// //     const rect = canvas.getBoundingClientRect();
// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;
// //     const ctx = canvas.getContext('2d');
// //     ctx.beginPath();
// //     ctx.moveTo(x, y);
// //   };

// //   const draw = (event) => {
// //     if (!isDrawing) return;
// //     const canvas = canvasRef.current;
// //     const rect = canvas.getBoundingClientRect();
// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;
// //     const ctx = canvas.getContext('2d');
// //     ctx.lineTo(x, y);
// //     ctx.stroke();
// //   };

// //   const stopDrawing = () => {
// //     setIsDrawing(false);
// //   };

// //   const clearCanvas = () => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext('2d');
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //   };

// //   // Save signature to local state and backend
// //   // In your saveSignature function:

// // // 2. Replace your existing saveSignature function with this:
// // const saveSignature = async () => {
// //   setIsLoading(true);
// //   try {
// //     if (signatureType === 'draw') {
// //       const signatureData = canvasRef.current.toDataURL();
// //       const newSignature = {
// //         id: Date.now(),
// //         type: signatureType,
// //         data: signatureData,
// //         preview: signatureData
// //       };
// //       setSignatures([...signatures, newSignature]);
// //     } else {
// //       const newSignature = {
// //         id: Date.now(),
// //         type: signatureType,
// //         data: {
// //           text: signatureText,
// //           font: signatureFont,
// //           color: signatureColor
// //         },
// //         preview: signatureText
// //       };
// //       setSignatures([...signatures, newSignature]);
// //     }
    
// //     setShowSignatureModal(false);
// //     setSignatureText('');
// //     clearCanvas();
// //   } catch (error) {
// //     console.error('Error saving signature:', error);
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };
// //   // Handle signature drop on document
// //   const handleSignatureDrop = async (event) => {
// //   event.preventDefault();
// //   if (draggedSignature) {
// //     const rect = event.currentTarget.getBoundingClientRect();
// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;

// //     try {
// //       // Get PDF dimensions to calculate proper y-position
// //       const pdfResponse = await axios.get(`http://localhost:5000/api/documents/${documentId}`);
// //       const pdfHeight = pdfResponse.data.data.height || 792; // Default to letter size height if not available

// //       // Calculate the inverted y-position for PDF coordinate system
// //       const pdfY = pdfHeight - y;

// //       const response = await axios.post(
// //         'http://localhost:5000/api/signatures/fields',
// //         {
// //           documentId,
// //           x,
// //           y: pdfY, // Use the converted y-position
// //           page: currentDocumentPage,
// //           width: 150,
// //           height: 50,
// //           type: draggedSignature.type
// //         },
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${localStorage.getItem('token')}`
// //           }
// //         }
// //       );

// //       const newDocumentSignature = {
// //         id: response.data.data.id,
// //         signatureId: draggedSignature.id,
// //         x,
// //         y, // Keep original y for frontend display
// //         page: currentDocumentPage,
// //         signature: draggedSignature
// //       };

// //       setDocumentSignatures([...documentSignatures, newDocumentSignature]);
// //       setSignatureFields([...signatureFields, response.data.data]);
// //     } catch (error) {
// //       console.error('Error creating signature field:', error);
// //     }
// //   }
// //   setDraggedSignature(null);
// // };

// //   // Remove signature from document
// //   const removeDocumentSignature = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/signatures/fields/${id}`, {
// //         headers: {
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`
// //         }
// //       });
      
// //       setDocumentSignatures(documentSignatures.filter(sig => sig.id !== id));
// //       setSignatureFields(signatureFields.filter(field => field.id !== id));
// //     } catch (error) {
// //       console.error('Error deleting signature field:', error);
// //     }
// //   };

// //   // Sign document (finalize all signatures)
// //   const signDocument = async () => {
// //     setIsLoading(true);
// //     try {
// //       // Sign each field
// //       for (const field of signatureFields) {
// //         const signature = documentSignatures.find(sig => sig.id === field.id)?.signature;
// //         if (signature) {
// //           await axios.post('http://localhost:5000/api/signatures/sign', {
// //             documentId,
// //             fieldId: field.id,
// //             signatureData: signature.type === 'draw' ? signature.data : signature.data.text,
// //             type: signature.type
// //           }, {
// //             headers: {
// //               'Authorization': `Bearer ${localStorage.getItem('token')}`
// //             }
// //           });
// //         }
// //       }
      
// //       setShowDownloadModal(true);
// //     } catch (error) {
// //       console.error('Signing error:', error);
// //       setAuthError(error.response?.data?.message || 'Signing failed');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Download signed document
// //   const downloadDocument = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:5000/api/documents/${documentId}/download`, {
// //         headers: {
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`
// //         },
// //         responseType: 'blob'
// //       });

// //       const url = window.URL.createObjectURL(new Blob([response.data]));
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.setAttribute('download', uploadedFile?.name || 'signed-document.pdf');
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();
      
// //       setShowDownloadModal(false);
// //       setCurrentPage('home');
// //       setUploadedFile(null);
// //       setDocumentSignatures([]);
// //       setSignatureFields([]);
// //     } catch (error) {
// //       console.error('Download error:', error);
// //       setAuthError(error.response?.data?.message || 'Download failed');
// //     }
// //   };

// //   // Send document for signing
// //   const sendForSigning = async () => {
// //     setIsLoading(true);
// //     try {
// //       // For each signature field, create a signing request
// //       for (const field of signatureFields) {
// //         await axios.post('http://localhost:5000/api/signatures/fields', {
// //           documentId,
// //           x: field.x,
// //           y: field.y,
// //           page: field.page,
// //           recipientEmail: sendForm.recipientEmail
// //         }, {
// //           headers: {
// //             'Authorization': `Bearer ${localStorage.getItem('token')}`
// //           }
// //         });
// //       }
      
// //       setShowSendModal(false);
// //       setCurrentPage('home');
// //       setUploadedFile(null);
// //       setDocumentSignatures([]);
// //       setSignatureFields([]);
// //     } catch (error) {
// //       console.error('Error sending for signing:', error);
// //       setAuthError(error.response?.data?.message || 'Sending failed');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Authentication functions
// //   const handleRegister = async () => {
// //     setIsLoading(true);
// //     setAuthError('');
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/auth/register', {
// //         name: authForm.name,
// //         email: authForm.email,
// //         password: authForm.password
// //       });

// //       localStorage.setItem('token', response.data.token);
// //       setIsAuthenticated(true);
// //       setCurrentPage('home');
// //       await fetchUserDocuments();
// //       await fetchUserSignatures();
// //     } catch (error) {
// //       setAuthError(error.response?.data?.message || 'Registration failed');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleLogin = async () => {
// //     setIsLoading(true);
// //     setAuthError('');
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/auth/login', {
// //         email: authForm.email,
// //         password: authForm.password
// //       });

// //       localStorage.setItem('token', response.data.token);
// //       setIsAuthenticated(true);
// //       setCurrentPage('home');
// //       await fetchUserDocuments();
// //       await fetchUserSignatures();
// //     } catch (error) {
// //       setAuthError(error.response?.data?.message || 'Login failed');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Fetch user documents
// //   const fetchUserDocuments = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/api/documents', {
// //         headers: {
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`
// //         }
// //       });
// //       setDocuments(response.data.data);
// //     } catch (error) {
// //       console.error('Error fetching documents:', error);
// //     }
// //   };

// //   // Fetch user signatures
// //   const fetchUserSignatures = async () => {
// //     try {
// //       // In a real app, you would fetch from backend
// //       const defaultSignatures = [
// //         {
// //           id: 1,
// //           type: 'type',
// //           data: { text: 'Your Signature', font: 'font-script', color: '#000000' },
// //           preview: 'Your Signature'
// //         }
// //       ];
// //       setSignatures(defaultSignatures);
// //     } catch (error) {
// //       console.error('Error fetching signatures:', error);
// //     }
// //   };

// //   // Load documents and signatures when authenticated
// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       fetchUserDocuments();
// //       fetchUserSignatures();
// //     }
// //   }, [isAuthenticated]);

// //   // Setup canvas on mount
// //   useEffect(() => {
// //     // Add Google Fonts
// //     const link = document.createElement('link');
// //     link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Playfair+Display:wght@400;700&family=Comfortaa:wght@400;700&display=swap';
// //     link.rel = 'stylesheet';
// //     document.head.appendChild(link);

// //     // Setup canvas
// //     if (canvasRef.current) {
// //       const canvas = canvasRef.current;
// //       const ctx = canvas.getContext('2d');
// //       ctx.lineWidth = 2;
// //       ctx.lineCap = 'round';
// //       ctx.strokeStyle = '#000000';
// //     }

// //     // Check for existing token
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       setIsAuthenticated(true);
// //       setCurrentPage('home');
// //       fetchUserDocuments();
// //       fetchUserSignatures();
// //     }

// //     return () => {
// //       document.head.removeChild(link);
// //     };
// //   }, []);

// //   // Components
// //   const LoadingSpinner = () => (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-xl p-6 flex flex-col items-center animate-pop-in">
// //         <Loader2 className="w-8 h-8 text-red-500 animate-spin mb-4" />
// //         <p className="text-gray-700">Processing...</p>
// //       </div>
// //     </div>
// //   );

// //   const LoginForm = () => (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
// //         <div className="text-center mb-8">
// //           <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
// //             <FileText className="w-8 h-8 text-white" />
// //           </div>
// //           <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
// //           <p className="text-gray-600">Sign in to your account</p>
// //         </div>
        
// //         {authError && (
// //           <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm animate-shake">
// //             {authError}
// //           </div>
// //         )}
        
// //         <div className="space-y-6">
// //           <div className="relative">
// //             <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
// //             <input
// //               type="email"
// //               placeholder="Email address"
// //               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //               value={authForm.email}
// //               onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
// //             />
// //           </div>
          
// //           <div className="relative">
// //             <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               placeholder="Password"
// //               className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //               value={authForm.password}
// //               onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
// //             />
// //             <button
// //               type="button"
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
// //             >
// //               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //             </button>
// //           </div>
          
// //           <button
// //             onClick={handleLogin}
// //             disabled={isLoading}
// //             className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 flex items-center justify-center"
// //           >
// //             {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
// //             Sign In
// //           </button>
// //         </div>
        
// //         <div className="mt-6 text-center">
// //           <p className="text-gray-600">
// //             Don't have an account?{' '}
// //             <button
// //               onClick={() => setCurrentPage('register')}
// //               className="text-red-500 hover:text-red-600 font-semibold transition-colors"
// //             >
// //               Sign up
// //             </button>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const RegisterForm = () => (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
// //         <div className="text-center mb-8">
// //           <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
// //             <User className="w-8 h-8 text-white" />
// //           </div>
// //           <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
// //           <p className="text-gray-600">Join us to start signing documents</p>
// //         </div>
        
// //         {authError && (
// //           <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm animate-shake">
// //             {authError}
// //           </div>
// //         )}
        
// //         <div className="space-y-6">
// //           <div className="relative">
// //             <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Full name"
// //               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //               value={authForm.name}
// //               onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
// //             />
// //           </div>
          
// //           <div className="relative">
// //             <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
// //             <input
// //               type="email"
// //               placeholder="Email address"
// //               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //               value={authForm.email}
// //               onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
// //             />
// //           </div>
          
// //           <div className="relative">
// //             <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               placeholder="Password"
// //               className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //               value={authForm.password}
// //               onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
// //             />
// //             <button
// //               type="button"
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
// //             >
// //               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //             </button>
// //           </div>
          
// //           <button
// //             onClick={handleRegister}
// //             disabled={isLoading}
// //             className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 flex items-center justify-center"
// //           >
// //             {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
// //             Create Account
// //           </button>
// //         </div>
        
// //         <div className="mt-6 text-center">
// //           <p className="text-gray-600">
// //             Already have an account?{' '}
// //             <button
// //               onClick={() => setCurrentPage('login')}
// //               className="text-red-500 hover:text-red-600 font-semibold transition-colors"
// //             >
// //               Sign in
// //             </button>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const HomePage = () => (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
// //       <nav className="bg-white shadow-lg border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             <div className="flex items-center">
// //               <div className="flex-shrink-0 flex items-center">
// //                 <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center mr-3 shadow-md">
// //                   <FileText className="w-5 h-5 text-white" />
// //                 </div>
// //                 <span className="text-xl font-bold text-gray-800">SignPDF</span>
// //               </div>
// //             </div>
// //             <div className="flex items-center space-x-4">
// //               {isAuthenticated ? (
// //                 <>
// //                   <button
// //                     onClick={() => setShowDocumentsModal(true)}
// //                     className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
// //                   >
// //                     My Documents
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       localStorage.removeItem('token');
// //                       setIsAuthenticated(false);
// //                       setCurrentPage('home');
// //                     }}
// //                     className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
// //                   >
// //                     Logout
// //                   </button>
// //                 </>
// //               ) : (
// //                 <>
// //                   <button
// //                     onClick={() => setCurrentPage('login')}
// //                     className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
// //                   >
// //                     Login
// //                   </button>
// //                   <button
// //                     onClick={() => setCurrentPage('register')}
// //                     className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
// //                   >
// //                     Sign up
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       <div className="max-w-4xl mx-auto px-4 py-16">
// //         <div className="text-center mb-12">
// //           <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
// //             {isAuthenticated ? 'Welcome Back!' : 'Sign PDF Documents'}
// //           </h1>
// //           <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
// //             {isAuthenticated 
// //               ? 'Upload a new document or continue working on existing ones.'
// //               : 'Your professional tool to eSign documents. Sign yourself or send signature requests to others.'}
// //           </p>
// //         </div>

// //         <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100 transition-all hover:shadow-xl">
// //           <div
// //             className="border-3 border-dashed border-red-300 rounded-xl p-12 text-center hover:border-red-400 transition-all duration-300 cursor-pointer group"
// //             onDragOver={handleDragOver}
// //             onDrop={handleDrop}
// //             onClick={() => fileInputRef.current?.click()}
// //           >
// //             <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
// //               <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
// //                 <Upload className="w-10 h-10 text-red-500" />
// //               </div>
// //             </div>
// //             <h3 className="text-2xl font-semibold text-gray-900 mb-2">Select PDF file</h3>
// //             <p className="text-gray-600 mb-6">or drop PDF here</p>
// //             <div className="flex justify-center space-x-2">
// //               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
// //               <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
// //               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
// //             </div>
// //           </div>
// //           <input
// //             ref={fileInputRef}
// //             type="file"
// //             accept=".pdf"
// //             onChange={handleFileUpload}
// //             className="hidden"
// //           />
// //         </div>

// //         <div className="grid md:grid-cols-2 gap-8">
// //           <div 
// //             className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer"
// //             onClick={() => {
// //               if (uploadedFile) {
// //                 setCurrentPage('document');
// //               } else {
// //                 fileInputRef.current?.click();
// //               }
// //             }}
// //           >
// //             <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 shadow-inner">
// //               <User className="w-8 h-8 text-blue-600" />
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-900 mb-2">Only me</h3>
// //             <p className="text-gray-600">Sign this document yourself</p>
// //           </div>
          
// //           <div 
// //             className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer"
// //             onClick={() => setShowSendModal(true)}
// //           >
// //             <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 shadow-inner">
// //               <div className="w-8 h-8 text-green-600 flex items-center justify-center">
// //                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
// //                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
// //                 </svg>
// //               </div>
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-900 mb-2">Several people</h3>
// //             <p className="text-gray-600">Invite others to sign</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const DocumentsModal = () => (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in">
// //         <div className="flex justify-between items-center mb-6">
// //           <h2 className="text-2xl font-bold text-gray-800">My Documents</h2>
// //           <button
// //             onClick={() => setShowDocumentsModal(false)}
// //             className="text-gray-400 hover:text-gray-600 p-2 transition-colors"
// //           >
// //             <X className="w-6 h-6" />
// //           </button>
// //         </div>

// //         {documents.length === 0 ? (
// //           <div className="text-center py-12">
// //             <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
// //             <h3 className="text-lg font-medium text-gray-700">No documents yet</h3>
// //             <p className="text-gray-500 mt-2">Upload your first document to get started</p>
// //           </div>
// //         ) : (
// //           <div className="grid md:grid-cols-2 gap-4">
// //             {documents.map((doc) => (
// //               <div 
// //                 key={doc.id}
// //                 className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
// //                 onClick={() => {
// //                   setDocumentId(doc.id);
// //                   setUploadedFile({ name: doc.original_name });
// //                   setCurrentPage('document');
// //                   setShowDocumentsModal(false);
// //                 }}
// //               >
// //                 <div className="flex items-center space-x-3">
// //                   <FileText className="w-8 h-8 text-red-500" />
// //                   <div className="flex-1 min-w-0">
// //                     <h3 className="text-sm font-medium text-gray-900 truncate">{doc.original_name}</h3>
// //                     <p className="text-xs text-gray-500">Uploaded on {new Date(doc.created_at).toLocaleDateString()}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );

// //   const SignatureModal = () => (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
// //         <div className="flex justify-between items-center mb-6">
// //           <h2 className="text-2xl font-bold text-gray-800">Create Signature</h2>
// //           <button
// //             onClick={() => setShowSignatureModal(false)}
// //             className="text-gray-400 hover:text-gray-600 p-2 transition-colors"
// //           >
// //             <X className="w-6 h-6" />
// //           </button>
// //         </div>

// //         <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
// //           <button
// //             onClick={() => setSignatureType('draw')}
// //             className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all flex-shrink-0 ${
// //               signatureType === 'draw' 
// //                 ? 'bg-red-500 text-white shadow-md' 
// //                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //             }`}
// //           >
// //             <PenTool className="w-5 h-5" />
// //             <span>Draw</span>
// //           </button>
          
// //           <button
// //             onClick={() => setSignatureType('type')}
// //             className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all flex-shrink-0 ${
// //               signatureType === 'type' 
// //                 ? 'bg-red-500 text-white shadow-md' 
// //                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //             }`}
// //           >
// //             <Type className="w-5 h-5" />
// //             <span>Type</span>
// //           </button>
// //         </div>

// //         {signatureType === 'draw' ? (
// //           <div className="space-y-4">
// //             <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 shadow-inner">
// //               <canvas
// //                 ref={canvasRef}
// //                 width={500}
// //                 height={200}
// //                 className="border border-gray-300 rounded cursor-crosshair bg-white w-full"
// //                 onMouseDown={startDrawing}
// //                 onMouseMove={draw}
// //                 onMouseUp={stopDrawing}
// //                 onMouseLeave={stopDrawing}
// //               />
// //             </div>
// //             <div className="flex justify-between">
// //               <button
// //                 onClick={clearCanvas}
// //                 className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
// //               >
// //                 <Trash2 className="w-4 h-4" />
// //                 <span>Clear</span>
// //               </button>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="space-y-4">
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-gray-700">Enter your signature</label>
// //               <input
// //                 type="text"
// //                 value={signatureText}
// //                 onChange={(e) => setSignatureText(e.target.value)}
// //                 placeholder="Your name"
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //               />
// //             </div>
            
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-gray-700">Font Style</label>
// //               <div className="grid grid-cols-2 gap-2">
// //                 {fonts.map((font) => (
// //                   <button
// //                     key={font.name}
// //                     onClick={() => setSignatureFont(font.class)}
// //                     className={`p-3 border rounded-lg text-left transition-all ${
// //                       signatureFont === font.class
// //                         ? 'border-red-500 bg-red-50 shadow-inner'
// //                         : 'border-gray-300 hover:border-gray-400'
// //                     }`}
// //                   >
// //                     <div style={font.style} className="text-xl">
// //                       {signatureText || 'Signature'}
// //                     </div>
// //                     <div className="text-xs text-gray-500 mt-1">{font.name}</div>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
            
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-gray-700">Color</label>
// //               <div className="flex space-x-2">
// //                 {colors.map((color) => (
// //                   <button
// //                     key={color}
// //                     onClick={() => setSignatureColor(color)}
// //                     className={`w-8 h-8 rounded-full border-2 transition-all ${
// //                       signatureColor === color ? 'border-gray-800 shadow-md' : 'border-gray-300 hover:border-gray-400'
// //                     }`}
// //                     style={{ backgroundColor: color }}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
            
// //             <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
// //               <div className="text-sm text-gray-600 mb-2">Preview:</div>
// //               <div 
// //                 className={`text-3xl ${signatureFont} transition-all`}
// //                 style={{ color: signatureColor }}
// //               >
// //                 {signatureText || 'Your signature will appear here'}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div className="flex justify-end space-x-3 mt-6">
// //           <button
// //             onClick={() => setShowSignatureModal(false)}
// //             className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={saveSignature}
// //             disabled={signatureType === 'type' && !signatureText}
// //             className={`px-6 py-2 rounded-lg transition-all ${
// //               signatureType === 'type' && !signatureText
// //                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //                 : 'bg-red-500 text-white hover:bg-red-600 shadow-md'
// //             }`}
// //           >
// //             Save Signature
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const DownloadModal = () => (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center animate-fade-in">
// //         <div className="mb-6">
// //           <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
// //             <Check className="w-10 h-10 text-green-600" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-800 mb-2">Document Signed!</h2>
// //           <p className="text-gray-600">Your document has been successfully signed and is ready for download.</p>
// //         </div>
        
// //         <div className="space-y-3">
// //           <button
// //             onClick={downloadDocument}
// //             className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
// //           >
// //             <Download className="w-5 h-5" />
// //             <span>Download Signed PDF</span>
// //           </button>
          
// //           <button
// //             onClick={() => {
// //               setShowDownloadModal(false);
// //               setCurrentPage('home');
// //             }}
// //             className="w-full text-gray-600 hover:text-gray-800 py-2 transition-colors"
// //           >
// //             Close
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const SendModal = () => (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-2xl p-8 w-full max-w-md animate-fade-in">
// //         <div className="flex justify-between items-center mb-6">
// //           <h2 className="text-2xl font-bold text-gray-800">Send for Signing</h2>
// //           <button
// //             onClick={() => setShowSendModal(false)}
// //             className="text-gray-400 hover:text-gray-600 p-2 transition-colors"
// //           >
// //             <X className="w-6 h-6" />
// //           </button>
// //         </div>

// //         <div className="space-y-6">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
// //             <input
// //               type="email"
// //               placeholder="Enter recipient's email"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //               value={sendForm.recipientEmail}
// //               onChange={(e) => setSendForm({...sendForm, recipientEmail: e.target.value})}
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
// //             <textarea
// //               placeholder="Add a personal message"
// //               rows="3"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
// //               value={sendForm.message}
// //               onChange={(e) => setSendForm({...sendForm, message: e.target.value})}
// //             ></textarea>
// //           </div>

// //           <div className="bg-gray-50 rounded-lg p-4">
// //             <div className="flex items-center space-x-3 mb-2">
// //               <Clock className="w-5 h-5 text-gray-500" />
// //               <span className="text-sm text-gray-600">Expires in 7 days</span>
// //             </div>
// //             <div className="flex items-center space-x-3">
// //               <Calendar className="w-5 h-5 text-gray-500" />
// //               <span className="text-sm text-gray-600">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
// //             </div>
// //           </div>

// //           <div className="flex justify-end space-x-3">
// //             <button
// //               onClick={() => setShowSendModal(false)}
// //               className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={sendForSigning}
// //               disabled={!sendForm.recipientEmail}
// //               className={`px-6 py-2 rounded-lg transition-all ${
// //                 !sendForm.recipientEmail
// //                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //                   : 'bg-red-500 text-white hover:bg-red-600 shadow-md'
// //               }`}
// //             >
// //               Send
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// //   const DocumentViewer = () => (
// //   <div className="min-h-screen bg-gray-100">
// //     <nav className="bg-white shadow-sm border-b border-gray-200">
// //       <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-16">
// //           <div className="flex items-center">
// //             <button
// //               onClick={() => {
// //                 setCurrentPage('home');
// //                 setUploadedFile(null);
// //                 setDocumentSignatures([]);
// //                 setSignatureFields([]);
// //               }}
// //               className="text-gray-600 hover:text-gray-900 mr-4 transition-colors"
// //             >
// //               <ChevronLeft className="w-5 h-5" />
// //             </button>
// //             <div className="flex items-center">
// //               <FileText className="w-6 h-6 text-red-500 mr-2" />
// //               <span className="font-semibold text-gray-800 truncate max-w-xs">
// //                 {uploadedFile?.name || 'Document.pdf'}
// //               </span>
// //             </div>
// //           </div>
// //           <div className="flex items-center space-x-4">
// //             <span className="text-sm text-gray-600">
// //               Page {currentDocumentPage} of {documentPages.length}
// //             </span>
// //             <button
// //               onClick={signDocument}
// //               className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
// //             >
// //               <Check className="w-4 h-4" />
// //               <span>Finish</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>

// //     <div className="flex h-[calc(100vh-64px)]">
// //       {/* Left Panel - Page Thumbnails */}
// //       <div className="w-48 bg-white border-r border-gray-200 overflow-y-auto">
// //         <div className="p-4">
// //           <h3 className="font-semibold text-gray-800 mb-4">Pages</h3>
// //           <div className="space-y-2">
// //             {documentPages.map((page) => (
// //               <button
// //                 key={page.id}
// //                 onClick={() => setCurrentDocumentPage(page.id)}
// //                 className={`w-full p-3 rounded-lg text-left transition-all ${
// //                   currentDocumentPage === page.id 
// //                     ? 'bg-red-50 border-2 border-red-500' 
// //                     : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
// //                 }`}
// //               >
// //                 <div className="text-xs font-medium text-gray-600 mb-1">Page {page.id}</div>
// //                 <div className="w-full h-24 bg-white border border-gray-300 rounded flex items-center justify-center">
// //                   <FileText className="w-6 h-6 text-gray-400" />
// //                 </div>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Middle Panel - Document Content */}
// //       <div className="flex-1 bg-gray-50 overflow-auto">
// //         <div className="p-8">
// //           <div 
// //             className="bg-white shadow-lg rounded-lg p-8 min-h-[800px] mx-auto max-w-2xl relative"
// //             onDragOver={handleDragOver}
// //             onDrop={handleSignatureDrop}
// //           >
// //             {/* Replace the text content with PDF preview */}
// //             {documentId ? (
// //               <iframe
// //   src={`http://localhost:5000/api/documents/${documentId}/download`}
// //   className="w-full h-full min-h-[700px] border-none"
// //   title="Document Preview"
// //   credentials="include"
// // />
// //             ) : (
// //               <div className="flex items-center justify-center h-full text-gray-500">
// //                 No document loaded
// //               </div>
// //             )}

// //             {/* Render signatures on document */}
// //             {documentSignatures
// //               .filter(sig => sig.page === currentDocumentPage)
// //               .map((docSig) => (
// //                 <div
// //                   key={docSig.id}
// //                   className="absolute cursor-move group"
// //                   style={{ left: `${docSig.x}px`, top: `${docSig.y}px` }}
// //                 >
// //                   <div className="relative">
// //                     {docSig.signature.type === 'draw' ? (
// //                       <img
// //                         src={docSig.signature.data}
// //                         alt="Signature"
// //                         className="max-w-32 max-h-16 border border-gray-300 rounded"
// //                       />
// //                     ) : (
// //                       <div 
// //                         className={`px-4 py-2 border border-gray-300 rounded bg-white ${docSig.signature.data?.font || 'font-sans'}`}
// //                         style={{ color: docSig.signature.data?.color || '#000000' }}
// //                       >
// //                         {docSig.signature.data?.text || 'Signature'}
// //                       </div>
// //                     )}
// //                     <button
// //                       onClick={() => removeDocumentSignature(docSig.id)}
// //                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
// //                     >
// //                       <X className="w-3 h-3" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
            
// //             {/* Drop zone indicator */}
// //             {draggedSignature && (
// //               <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center">
// //                 <div className="text-blue-600 text-lg font-semibold">
// //                   Drop signature here
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Right Panel - Signature Tools */}
// //       <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
// //         <div className="p-6">
// //           <h3 className="text-xl font-semibold text-gray-800 mb-6">Signing Options</h3>
          
// //           <div className="space-y-6">
// //             <div>
// //               <h4 className="font-medium text-gray-700 mb-3">Your Signatures</h4>
// //               <div className="space-y-2">
// //                 {signatures.map((signature) => (
// //                   <div
// //                     key={signature.id}
// //                     className="bg-gray-50 rounded-lg p-3 cursor-move hover:bg-gray-100 transition-colors"
// //                     draggable
// //                     onDragStart={() => setDraggedSignature(signature)}
// //                     onDragEnd={() => setDraggedSignature(null)}
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center space-x-2">
// //                         <Move className="w-4 h-4 text-gray-400" />
// //                         <span className="text-sm text-gray-600">
// //                           {signature.type === 'draw' ? 'Drawing' : 'Text'}
// //                         </span>
// //                       </div>
// //                       <button
// //                         onClick={() => setSignatures(signatures.filter(s => s.id !== signature.id))}
// //                         className="text-red-500 hover:text-red-700"
// //                       >
// //                         <Trash2 className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                     <div className="mt-2">
// //                       {signature.type === 'draw' ? (
// //                         <img 
// //                           src={signature.data} 
// //                           alt="Signature" 
// //                           className="max-w-full max-h-12 border border-gray-300 rounded"
// //                         />
// //                       ) : (
// //                         <div 
// //                           className={`text-lg ${signature.data.font}`}
// //                           style={{ color: signature.data.color }}
// //                         >
// //                           {signature.data.text}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
                
// //                 <button
// //                   onClick={() => setShowSignatureModal(true)}
// //                   className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
// //                 >
// //                   <Plus className="w-5 h-5" />
// //                   <span>Add Signature</span>
// //                 </button>
// //               </div>
// //             </div>

// //             <div>
// //               <h4 className="font-medium text-gray-700 mb-3">Fields</h4>
// //               <div className="space-y-3">
// //                 <div className="bg-gray-50 rounded-lg p-3">
// //                   <div className="flex items-center justify-between mb-2">
// //                     <span className="text-sm font-medium text-gray-700">Signature</span>
// //                     <Edit3 className="w-4 h-4 text-gray-400" />
// //                   </div>
// //                   <div className="text-right">
// //                     <span className="text-2xl font-script text-gray-600">Your Signature</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="bg-gray-50 rounded-lg p-3">
// //                   <div className="flex items-center justify-between">
// //                     <span className="text-sm font-medium text-gray-700">Name</span>
// //                     <User className="w-4 h-4 text-gray-400" />
// //                   </div>
// //                 </div>
                
// //                 <div className="bg-gray-50 rounded-lg p-3">
// //                   <div className="flex items-center justify-between">
// //                     <span className="text-sm font-medium text-gray-700">Date</span>
// //                     <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
// //                       <span className="text-gray-600 text-xs">01</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// //   // Main render logic
// //   return (
// //     <>
// //       {isLoading && <LoadingSpinner />}
      
// //       {!isAuthenticated ? (
// //         currentPage === 'register' ? (
// //           <RegisterForm />
// //         ) : currentPage === 'login' ? (
// //           <LoginForm />
// //         ) : (
// //           <HomePage />
// //         )
// //       ) : currentPage === 'document' ? (
// //         <>
// //           <DocumentViewer />
// //           {showSignatureModal && <SignatureModal />}
// //           {showDownloadModal && <DownloadModal />}
// //         </>
// //       ) : (
// //         <HomePage />
// //       )}
      
// //       {showSendModal && <SendModal />}
// //       {showDocumentsModal && <DocumentsModal />}
// //     </>
// //   );
// // };

// // export default DocumentSigningApp;



































































// import React, { useState, useRef, useEffect } from 'react';
// import { useDrag, useDrop, DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiUpload, FiDownload, FiEdit2, FiType, FiImage, FiX, FiCheck, FiUser, FiMail, FiLock, FiMinimize, FiMaximize } from 'react-icons/fi';

// const ErrorBoundary = ({ children, fallback }) => {
//   const [hasError, setHasError] = useState(false);

//   useEffect(() => {
//     const errorHandler = () => setHasError(true);
//     window.addEventListener('error', errorHandler);
//     return () => window.removeEventListener('error', errorHandler);
//   }, []);

//   return hasError ? fallback : children;
// };

// const App = () => {
//   // Auth state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [authMode, setAuthMode] = useState('login');
  
//   // Document state
//   const [documents, setDocuments] = useState([]);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
//   const [isDraggingOver, setIsDraggingOver] = useState(false);
  
//   // Signature state
//   const [signatureMode, setSignatureMode] = useState(null);
//   const [signatureImage, setSignatureImage] = useState(null);
//   const [signatureText, setSignatureText] = useState('');
//   const [signatureFields, setSignatureFields] = useState([]);
//   const [activeField, setActiveField] = useState(null);
//   const [showSignatureModal, setShowSignatureModal] = useState(false);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [signatureFont, setSignatureFont] = useState('Dancing Script');
//   const [signatureSize, setSignatureSize] = useState(16);
//   const [currentFieldSize, setCurrentFieldSize] = useState({ width: 200, height: 50 });
  
//   // UI state
//   const [isLoading, setIsLoading] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const fileInputRef = useRef(null);
//   const pdfContainerRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Font options
//   const fontOptions = [
//     { value: 'Dancing Script', label: 'Dancing Script' },
//     { value: 'Arial', label: 'Arial' },
//     { value: 'Times New Roman', label: 'Times New Roman' },
//     { value: 'Courier New', label: 'Courier New' }
//   ];

//   // API configuration
//   const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
//   });

//   api.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   }, error => Promise.reject(error));

//   // Drawing functions
//   const startDrawing = (e) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.beginPath();
//     ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     setIsDrawing(true);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     ctx.strokeStyle = '#000000';
//     ctx.lineWidth = 2;
//     ctx.lineCap = 'round';
//     ctx.stroke();
//   };

//   const stopDrawing = () => setIsDrawing(false);

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const saveDrawing = () => {
//     const canvas = canvasRef.current;
//     setSignatureImage(canvas.toDataURL());
//     setShowSignatureModal(false);
//     addNotification('Signature saved! Drag to position', 'success');
//   };

//   // Add notification
//   const addNotification = (message, type = 'info') => {
//     const id = Date.now();
//     setNotifications([...notifications, { id, message, type }]);
//     setTimeout(() => {
//       setNotifications(notifications.filter(n => n.id !== id));
//     }, 5000);
//   };

//   // Authentication handlers
//   const handleAuth = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData.entries());
    
//     try {
//       setIsLoading(true);
//       const response = await api.post(authMode === 'login' ? '/auth/login' : '/auth/register', data);
//       localStorage.setItem('token', response.data.token);
//       setUser(response.data.user);
//       setIsAuthenticated(true);
//       fetchDocuments();
//       addNotification(`Welcome back, ${response.data.user.name}!`, 'success');
//     } catch (error) {
//       addNotification(error.response?.data?.message || 'Authentication failed', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Document handlers
//   const fetchDocuments = async () => {
//     try {
//       const response = await api.get('/documents');
//       setDocuments(response.data.data);
//     } catch (error) {
//       addNotification('Failed to fetch documents', 'error');
//     }
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     await uploadDocument(file);
//   };

//   const handleDrop = async (e) => {
//     e.preventDefault();
//     setIsDraggingOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file?.type === 'application/pdf') {
//       await uploadDocument(file);
//     } else {
//       addNotification('Only PDF files are supported', 'error');
//     }
//   };

//   const uploadDocument = async (file) => {
//     try {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append('document', file);
      
//       const response = await api.post('/documents/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
      
//       setDocuments([...documents, response.data.data]);
//       setPdfFile(response.data.data);
//       fetchDocumentDimensions(response.data.data.id);
//       addNotification('Document uploaded successfully!', 'success');
//     } catch (error) {
//       addNotification('Upload failed', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchDocumentDimensions = async (docId) => {
//     try {
//       const response = await api.get(`/documents/${docId}`);
//       setPdfDimensions({
//         width: response.data.data.width,
//         height: response.data.data.height
//       });
//     } catch (error) {
//       addNotification('Failed to load document dimensions', 'error');
//     }
//   };

//   // Signature handlers
//   const handleAddSignatureField = (e, page) => {
//   if (!signatureMode || !pdfContainerRef.current) return;
    
//     const rect = pdfContainerRef.current.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;

//     const newField = {
//     id: uuidv4(), // Generate UUID on client side
//     x,
//     y,
//     page,
//     width: currentFieldSize.width,
//     height: currentFieldSize.height,
//     type: signatureMode,
//     status: 'pending',
//     font: signatureFont,
//     size: signatureSize
//   };
//   api.post('/signatures/fields', {
//     ...newField,
//     documentId: pdfFile.id
//   }).catch(error => {
//     console.error('Failed to save field:', error);
//     addNotification('Failed to create signature field', 'error');
//   });
    
//     setSignatureFields([...signatureFields, newField]);
//   setActiveField(newField.id);
//   setShowSignatureModal(true);
// };

//   const handleMoveSignature = (id, x, y) => {
//     setSignatureFields(fields => fields.map(field => field.id === id ? { ...field, x, y } : field));
//   };

//   const handleResizeSignature = (id, width, height) => {
//     setSignatureFields(fields => fields.map(field => field.id === id ? { ...field, width, height } : field));
//   };

//   const handleFinalizeSignature = async () => {
//     if (!pdfFile || !signatureFields.length) return;
    
//     try {
//       setIsLoading(true);
//       for (const field of signatureFields) {
//         await api.post('/signatures/sign', {
//           documentId: pdfFile.id,
//           fieldId: field.id,
//           type: field.type,
//           signatureData: field.type === 'text' ? signatureText : signatureImage,
//           x: field.x,
//           y: field.y,
//           width: field.width,
//           height: field.height,
//           page: field.page
//         });
//       }
      
//       const signedDocResponse = await api.get(`/documents/${pdfFile.id}/download`);
//       const link = document.createElement('a');
//       link.href = signedDocResponse.data.url;
//       link.download = `signed_${pdfFile.original_name}`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       addNotification('Document signed and downloaded!', 'success');
//       setSignatureFields([]);
//       setSignatureMode(null);
//       setShowSignatureModal(false);
//     } catch (error) {
//       addNotification(error.response?.data?.message || 'Signing failed', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // In your React component (App.js)
// const handleFinalizeDocument = async () => {
//   try {
//     setIsLoading(true);
    
//     // First ensure all fields are signed
//     const response = await api.get(`/signatures/documents/${pdfFile.id}/finalize`);
    
//     // Create download link
//     const link = document.createElement('a');
//     link.href = response.data.data.downloadUrl;
//     link.download = `signed_${pdfFile.original_name}`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     addNotification('Document finalized and downloaded!', 'success');
//   } catch (error) {
//     addNotification(error.response?.data?.message || 'Finalization failed', 'error');
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // Drag and drop components
//   const SignatureField = ({ id, x, y, width, height, type, font, size }) => {
//     const [isResizing, setIsResizing] = useState(false);
//     const [startPos, setStartPos] = useState({ x: 0, y: 0 });
//     const [startSize, setStartSize] = useState({ width: 0, height: 0 });

//     const [{ isDragging }, drag] = useDrag(() => ({
//       type: 'SIGNATURE',
//       item: { id },
//       collect: monitor => ({ isDragging: !!monitor.isDragging() }),
//     }));

//     const handleResizeMouseDown = (e) => {
//       e.stopPropagation();
//       setIsResizing(true);
//       setStartPos({ x: e.clientX, y: e.clientY });
//       setStartSize({ width, height });
//     };

//     const handleMouseMove = (e) => {
//       if (isResizing) {
//         const newWidth = Math.max(50, startSize.width + (e.clientX - startPos.x));
//         const newHeight = Math.max(30, startSize.height + (e.clientY - startPos.y));
//         handleResizeSignature(id, newWidth, newHeight);
//       }
//     };

//     const handleMouseUp = () => setIsResizing(false);

//     useEffect(() => {
//       if (isResizing) {
//         window.addEventListener('mousemove', handleMouseMove);
//         window.addEventListener('mouseup', handleMouseUp);
//         return () => {
//           window.removeEventListener('mousemove', handleMouseMove);
//           window.removeEventListener('mouseup', handleMouseUp);
//         };
//       }
//     }, [isResizing, handleMouseMove]);

//     return (
//       <motion.div
//         ref={drag}
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         style={{
//           position: 'absolute',
//           left: x,
//           top: y,
//           width,
//           height,
//           border: '2px dashed rgba(66, 153, 225, 0.8)',
//           borderRadius: '4px',
//           backgroundColor: 'rgba(66, 153, 225, 0.1)',
//           opacity: isDragging ? 0.5 : 1,
//           cursor: 'move',
//           zIndex: 100,
//           backdropFilter: 'blur(2px)',
//         }}
//         whileHover={{ 
//           boxShadow: '0 0 15px rgba(66, 153, 225, 0.5)',
//           backgroundColor: 'rgba(66, 153, 225, 0.2)'
//         }}
//         className="transition-all duration-200"
//       >
//         {type === 'text' ? (
//           <div 
//             className="flex items-center justify-center h-full text-blue-500 font-bold"
//             style={{ fontFamily: font, fontSize: `${size}px` }}
//           >
//             {signatureText || 'Your Name'}
//           </div>
//         ) : (
//           signatureImage && (
//             <img src={signatureImage} alt="Signature" className="w-full h-full object-contain" />
//           )
//         )}
//         <div 
//           className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize"
//           onMouseDown={handleResizeMouseDown}
//         >
//           <FiMaximize className="w-3 h-3 text-white" />
//         </div>
//       </motion.div>
//     );
//   };

//   const PageDropZone = ({ page }) => {
//     const [{ canDrop, isOver }, drop] = useDrop(() => ({
//       accept: 'SIGNATURE',
//       drop: (item, monitor) => {
//         const delta = monitor.getDifferenceFromInitialOffset();
//         const itemId = item.id;
//         const field = signatureFields.find(f => f.id === itemId);
        
//         if (field && delta) {
//           handleMoveSignature(
//             itemId, 
//             Math.max(0, field.x + delta.x), 
//             Math.max(0, field.y + delta.y)
//           );
//         }
//       },
//       collect: (monitor) => ({
//         isOver: monitor.isOver(),
//         canDrop: monitor.canDrop(),
//       }),
//     }));

//     return (
//       <div
//         ref={drop}
//         className={`w-full h-full ${isOver ? 'bg-blue-50' : 'bg-transparent'} transition-colors duration-200`}
//         onClick={(e) => handleAddSignatureField(e, page)}
//       >
//         <AnimatePresence>
//           {signatureFields
//             .filter(field => field.page === page)
//             .map(field => (
//               <SignatureField 
//                 key={field.id} 
//                 id={field.id}
//                 x={field.x}
//                 y={field.y}
//                 width={field.width}
//                 height={field.height}
//                 type={field.type}
//                 font={field.font}
//                 size={field.size}
//               />
//             ))}
//         </AnimatePresence>
//       </div>
//     );
//   };

//   // Effect to check auth on mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       api.get('/auth/verify')
//         .then(response => {
//           setUser(response.data.user);
//           setIsAuthenticated(true);
//           fetchDocuments();
//         })
//         .catch(() => localStorage.removeItem('token'));
//     }
//   }, []);

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-full max-w-md"
//         >
//           <div className="p-8">
//             <div className="flex justify-center mb-6">
//               <div className="bg-blue-500 p-3 rounded-full">
//                 <FiUser className="text-white text-2xl" />
//               </div>
//             </div>
            
//             <h2 className="text-2xl font-bold text-center text-white mb-2">
//               {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
//             </h2>
//             <p className="text-center text-blue-200 mb-8">
//               {authMode === 'login' ? 'Sign in to your account' : 'Join us to start signing documents'}
//             </p>
            
//             <form onSubmit={handleAuth}>
//               {authMode === 'register' && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   className="mb-4"
//                 >
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FiUser className="text-blue-300" />
//                     </div>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Full name"
//                       required
//                       className="w-full pl-10 pr-3 py-3 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </motion.div>
//               )}
              
//               <div className="mb-4">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiMail className="text-blue-300" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email address"
//                     required
//                     className="w-full pl-10 pr-3 py-3 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLock className="text-blue-300" />
//                   </div>
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     required
//                     className="w-full pl-10 pr-3 py-3 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                 ) : null}
//                 {authMode === 'login' ? 'Sign In' : 'Create Account'}
//               </button>
//             </form>
            
//             <div className="mt-6 text-center">
//               <button
//                 onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
//                 className="text-blue-200 hover:text-white text-sm font-medium transition duration-300"
//               >
//                 {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="min-h-screen bg-gray-100 flex">
//         {/* Sidebar */}
//         <div className="w-72 bg-white shadow-lg flex flex-col">
//           <div className="p-6 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-800">SignPDF</h1>
//             <p className="text-sm text-gray-500 mt-1">Your professional eSign tool</p>
//           </div>
          
//           <div className="p-6">
//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="mb-6"
//             >
//               <input 
//                 type="file" 
//                 ref={fileInputRef}
//                 accept=".pdf"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               <button
//                 onClick={() => fileInputRef.current.click()}
//                 disabled={isLoading}
//                 className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
//               >
//                 <FiUpload className="mr-2" />
//                 {isLoading ? 'Uploading...' : 'Upload PDF'}
//               </button>
//             </motion.div>
            
//             <div 
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 setIsDraggingOver(true);
//               }}
//               onDragLeave={() => setIsDraggingOver(false)}
//               onDrop={handleDrop}
//               className={`mb-6 p-4 border-2 border-dashed rounded-lg text-center transition-all duration-300 ${isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
//             >
//               <FiUpload className="mx-auto text-gray-400 mb-2" />
//               <p className="text-sm text-gray-500">or drop PDF here</p>
//             </div>
            
//             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">My Documents</h3>
//             <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
//               {documents.map(doc => (
//                 <motion.div
//                   key={doc.id}
//                   whileHover={{ x: 5 }}
//                   whileTap={{ scale: 0.98 }}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${selectedDocument?.id === doc.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
//                   onClick={async () => {
//                     setSelectedDocument(doc);
//                     setPdfFile(doc);
//                     try {
//                       const response = await api.get(`/documents/${doc.id}`);
//                       setPdfDimensions({
//                         width: response.data.data.width,
//                         height: response.data.data.height
//                       });
//                       const fieldsResponse = await api.get(`/signatures/fields/${doc.id}`);
//                       setSignatureFields(fieldsResponse.data.data || []);
//                       addNotification('Document loaded successfully', 'success');
//                     } catch (error) {
//                       addNotification('Failed to load document details', 'error');
//                     }
//                   }}
//                 >
//                   <div className="font-medium text-gray-800 truncate">{doc.original_name}</div>
//                   <div className="text-xs text-gray-500">
//                     {new Date(doc.created_at).toLocaleDateString()}
//                   </div>
//                 </motion.div>
//               ))}
              
//               {documents.length === 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-center py-8 text-gray-400"
//                 >
//                   <p>No documents yet</p>
//                   <p className="text-sm mt-1">Upload your first PDF</p>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
        
//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <header className="bg-white shadow-sm z-10">
//             <div className="px-6 py-4 flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {pdfFile ? pdfFile.original_name : 'Select a document'}
//               </h2>
//               <div className="flex items-center space-x-4">
//                 <div className="relative">
//                   <button className="p-2 rounded-full hover:bg-gray-100">
//                     <FiUser className="text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </header>
          
//           {/* PDF Viewer Area */}
//           <main className="flex-1 bg-gray-50 p-6 overflow-auto">
//             {pdfFile ? (
//               <ErrorBoundary
//                 fallback={
//                   <div className="p-8 text-center text-red-500">
//                     Failed to load document. Please try again.
//                   </div>
//                 }
//               >
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
//                 >
//                   {/* Toolbar */}
//                   <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-gray-100">
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-medium text-gray-700">Signing Tools</h3>
//                       <div className="flex space-x-2">
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className={`px-4 py-2 rounded-md flex items-center space-x-2 ${signatureMode === 'draw' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
//                           onClick={() => setSignatureMode('draw')}
//                         >
//                           <FiImage />
//                           <span>Draw</span>
//                         </motion.button>
                        
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className={`px-4 py-2 rounded-md flex items-center space-x-2 ${signatureMode === 'type' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
//                           onClick={() => setSignatureMode('type')}
//                         >
//                           <FiType />
//                           <span>Type</span>
//                         </motion.button>
                        
//                         {signatureFields.length > 0 && (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center space-x-2"
//                             onClick={handleFinalizeSignature}
//                             disabled={isLoading}
//                           >
//                             <FiDownload />
//                             <span>{isLoading ? 'Processing...' : 'Finalize'}</span>
//                           </motion.button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* PDF Container */}
//                   {/* PDF Container */}
// <div 
//   ref={pdfContainerRef}
//   className="flex-1 relative overflow-auto"
//   style={{
//     background: '#f0f0f0',
//     display: 'flex',
//     justifyContent: 'center'
//   }}
// >
//   {pdfFile && (
//     <div style={{ position: 'relative', margin: '20px' }}>
//       <iframe
//         src={`${pdfFile.public_url}#toolbar=0&navpanes=0&scrollbar=0`}
//         className="border border-gray-300 shadow-lg"
//         style={{
//           width: '800px',
//           height: '1100px'
//         }}
//         title="Document Preview"
//       />
//       <div 
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           pointerEvents: signatureMode ? 'auto' : 'none'
//         }}
//       >
//         <PageDropZone page={1} />
//       </div>
//     </div>
//   )}
// </div>
//                 </motion.div>
//               </ErrorBoundary>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-white rounded-xl shadow-lg p-12 text-center h-full flex flex-col items-center justify-center"
//               >
//                 <div className="max-w-md">
//                   <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-full inline-block mb-6">
//                     <FiUpload className="text-blue-500 text-4xl" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">No document selected</h3>
//                   <p className="text-gray-500 mb-6">Upload a new PDF or select an existing one to start signing</p>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => fileInputRef.current.click()}
//                     className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
//                   >
//                     Select PDF File
//                   </motion.button>
//                 </div>
//               </motion.div>
//             )}
//           </main>
//         </div>
        
//         {/* Signature Modal */}
//         <AnimatePresence>
//           {showSignatureModal && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//               onClick={() => setShowSignatureModal(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//                 className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                   {signatureMode === 'draw' ? 'Draw Your Signature' : 'Type Your Signature'}
//                 </h3>
                
//                 {signatureMode === 'draw' ? (
//                   <div className="space-y-4">
//                     <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
//                       <canvas
//                         ref={canvasRef}
//                         width={500}
//                         height={200}
//                         onMouseDown={startDrawing}
//                         onMouseMove={draw}
//                         onMouseUp={stopDrawing}
//                         onMouseLeave={stopDrawing}
//                         className="w-full border border-gray-300 cursor-crosshair bg-white"
//                       />
//                     </div>
//                     <div className="flex justify-between">
//                       <button
//                         onClick={clearCanvas}
//                         className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//                       >
//                         Clear
//                       </button>
//                       <button
//                         onClick={saveDrawing}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                       >
//                         Save Signature
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       value={signatureText}
//                       onChange={(e) => setSignatureText(e.target.value)}
//                       placeholder="Type your name"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
//                         <select
//                           value={signatureFont}
//                           onChange={(e) => setSignatureFont(e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                         >
//                           {fontOptions.map(font => (
//                             <option key={font.value} value={font.value}>{font.label}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Size: {signatureSize}px</label>
//                         <input
//                           type="range"
//                           min="10"
//                           max="30"
//                           value={signatureSize}
//                           onChange={(e) => setSignatureSize(e.target.value)}
//                           className="w-full"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="p-4 bg-gray-50 rounded-lg">
//                       <p 
//                         className="text-center font-bold text-blue-600"
//                         style={{ 
//                           fontFamily: signatureFont,
//                           fontSize: `${signatureSize}px`
//                         }}
//                       >
//                         {signatureText || 'Preview'}
//                       </p>
//                     </div>
                    
//                     <div className="flex justify-end space-x-3">
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setShowSignatureModal(false)}
//                         className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                       >
//                         Cancel
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => {
//                           setShowSignatureModal(false);
//                           addNotification('Signature added! Drag to position', 'success');
//                         }}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                       >
//                         Confirm
//                       </motion.button>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
        
//         {/* Notifications */}
//         <div className="fixed bottom-4 right-4 space-y-2 z-50">
//           <AnimatePresence>
//             {notifications.map((notification) => (
//               <motion.div
//                 key={notification.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.3 }}
//                 className={`px-4 py-3 rounded-lg shadow-lg flex items-center ${notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`}
//               >
//                 {notification.type === 'error' ? (
//                   <FiX className="mr-2" />
//                 ) : (
//                   <FiCheck className="mr-2" />
//                 )}
//                 <span>{notification.message}</span>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default App;






































































import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiDownload, FiEdit2, FiType, FiImage, FiX, FiCheck, FiUser, FiMail, FiLock, FiMinimize, FiMaximize } from 'react-icons/fi';

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  return hasError ? fallback : children;
};

const App = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  
  // Document state
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  
  // Signature state
  const [signatureMode, setSignatureMode] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [signatureText, setSignatureText] = useState('');
  const [signatureFields, setSignatureFields] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureFont, setSignatureFont] = useState('Dancing Script');
  const [signatureSize, setSignatureSize] = useState(16);
  const [currentFieldSize, setCurrentFieldSize] = useState({ width: 200, height: 50 });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const fileInputRef = useRef(null);
  const pdfContainerRef = useRef(null);
  const canvasRef = useRef(null);

  // Font options
  const fontOptions = [
    { value: 'Dancing Script', label: 'Dancing Script' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' }
  ];

  // API configuration
  // In your API configuration
const api = axios.create({
  baseURL: 'https://docsign-backend-zrlf.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => Promise.reject(error));

  // Drawing functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    setSignatureImage(canvas.toDataURL());
    setShowSignatureModal(false);
    addNotification('Signature saved! Drag to position', 'success');
  };

  // Add notification
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
    setTimeout(() => {
      setNotifications(notifications.filter(n => n.id !== id));
    }, 5000);
  };

  // Authentication handlers
  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      setIsLoading(true);
      const response = await api.post(authMode === 'login' ? '/auth/login' : '/auth/register', data);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      fetchDocuments();
      addNotification(`Welcome back, ${response.data.user.name}!`, 'success');
    } catch (error) {
      addNotification(error.response?.data?.message || 'Authentication failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Document handlers
  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents');
      setDocuments(response.data.data);
    } catch (error) {
      //addNotification('Failed to fetch documents', 'error');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadDocument(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      await uploadDocument(file);
    } else {
      addNotification('Only PDF files are supported', 'error');
    }
  };

  const uploadDocument = async (file) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('document', file);
      
      const response = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setDocuments([...documents, response.data.data]);
      setPdfFile(response.data.data);
      fetchDocumentDimensions(response.data.data.id);
      addNotification('Document uploaded successfully!', 'success');
    } catch (error) {
      addNotification('Upload failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocumentDimensions = async (docId) => {
    try {
      const response = await api.get(`/documents/${docId}`);
      setPdfDimensions({
        width: response.data.data.width,
        height: response.data.data.height
      });
    } catch (error) {
      addNotification('Failed to load document dimensions', 'error');
    }
  };

  // Signature handlers
  const handleAddSignatureField = async (e, page) => {
    if (!signatureMode || !pdfContainerRef.current) return;
    
    const rect = pdfContainerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const newField = {
      id: uuidv4(),
      x,
      y,
      page,
      width: Math.round(currentFieldSize.width),
      height: Math.round(currentFieldSize.height),
      type: signatureMode,
      status: 'pending',
      font: signatureFont,
      size: signatureSize
    };
    setSignatureFields([...signatureFields, newField]);
  setActiveField(newField.id);
  setShowSignatureModal(true);

    try {
      await api.post(`/documents/${pdfFile.id}/fields`, {
        ...newField,
        documentId: pdfFile.id
      });
      setSignatureFields([...signatureFields, newField]);
      setActiveField(newField.id);
      setShowSignatureModal(true);
    } catch (error) {
      console.error('Failed to save field:', error);
      //addNotification('Failed to create signature field', 'error');
    }
  };

  const handleMoveSignature = (id, x, y) => {
    setSignatureFields(fields => fields.map(field => 
      field.id === id ? { ...field, x: Math.round(x), y: Math.round(y) } : field
    ));
  };

  const handleResizeSignature = (id, width, height) => {
    setSignatureFields(fields => fields.map(field => 
      field.id === id ? { ...field, width: Math.round(width), height: Math.round(height) } : field
    ));
  };

  // const handleFinalizeSignature = async () => {
  //   if (!pdfFile || !signatureFields.length) return;
    
  //   try {
  //     setIsLoading(true);
      
  //     // First save all fields to backend
  //     for (const field of signatureFields) {
  //       await api.post(`/documents/${pdfFile.id}/fields`, {
  //         ...field,
  //         documentId: pdfFile.id
  //       });
  //     }
      
  //     // Then sign all fields
  //     for (const field of signatureFields) {
  //       await api.post(`/documents/${pdfFile.id}/sign`, {
  //         documentId: pdfFile.id,
  //         fieldId: field.id,
  //         type: field.type,
  //         signatureData: field.type === 'text' ? signatureText : signatureImage,
  //         x: field.x,
  //         y: field.y,
  //         width: field.width,
  //         height: field.height,
  //         page: field.page
  //       });
  //     }
      
  //     // Finalize and download
  //     const response = await api.get(`/documents/${pdfFile.id}/finalize`);
  //     const link = document.createElement('a');
  //     link.href = response.data.data.downloadUrl;
  //     link.download = `signed_${pdfFile.original_name}`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
      
  //     addNotification('Document signed and downloaded!', 'success');
  //     setSignatureFields([]);
  //     setSignatureMode(null);
  //     setShowSignatureModal(false);
  //   } catch (error) {
  //     console.error('Signing error:', error);
  //     addNotification(error.response?.data?.message || 'Signing failed', 'error');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleFinalizeSignature = async () => {
  if (!pdfFile || !signatureFields.length) return;
  
  try {
    setIsLoading(true);
    
    // First save all fields to backend
    for (const field of signatureFields) {
      await api.post(`/documents/${pdfFile.id}/sign`, {
        documentId: pdfFile.id,
        fieldId: field.id,
        type: field.type,
        signatureData: field.type === 'text' ? signatureText : signatureImage,
        x: field.x,
        y: field.y,
        width: field.width,
        height: field.height,
        page: field.page || 1
      });
    }
    
    // Finalize and download
    const response = await api.get(`/documents/${pdfFile.id}/finalize`);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = response.data.data.downloadUrl;
    link.download = response.data.data.filename || `signed_${pdfFile.original_name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addNotification('Document signed and downloaded!', 'success');
    setSignatureFields([]);
    setSignatureMode(null);
    setShowSignatureModal(false);
  } catch (error) {
    console.error('Signing error:', error);
    addNotification(error.response?.data?.message || 'Sigining Done', 'error');
  } finally {
    setIsLoading(false);
  }
};

  // Drag and drop components
  const SignatureField = ({ id, x, y, width, height, type, font, size }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState({ width: 0, height: 0 });

    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'SIGNATURE',
      item: { id },
      collect: monitor => ({ isDragging: !!monitor.isDragging() }),
    }));

    const handleResizeMouseDown = (e) => {
      e.stopPropagation();
      setIsResizing(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartSize({ width, height });
    };

    const handleMouseMove = (e) => {
      if (isResizing) {
        const newWidth = Math.max(50, startSize.width + (e.clientX - startPos.x));
        const newHeight = Math.max(30, startSize.height + (e.clientY - startPos.y));
        handleResizeSignature(id, newWidth, newHeight);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    useEffect(() => {
      if (isResizing) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isResizing, handleMouseMove]);

    return (
      <motion.div
        ref={drag}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          height,
          border: '2px dashed rgba(66, 153, 225, 0.8)',
          borderRadius: '4px',
          backgroundColor: 'rgba(66, 153, 225, 0.1)',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          zIndex: 100,
          backdropFilter: 'blur(2px)',
        }}
        whileHover={{ 
          boxShadow: '0 0 15px rgba(66, 153, 225, 0.5)',
          backgroundColor: 'rgba(66, 153, 225, 0.2)'
        }}
        className="transition-all duration-200"
      >
        {type === 'text' ? (
          <div 
            className="flex items-center justify-center h-full text-blue-500 font-bold"
            style={{ fontFamily: font, fontSize: `${size}px` }}
          >
            {signatureText || 'Your Name'}
          </div>
        ) : (
          signatureImage && (
            <img src={signatureImage} alt="Signature" className="w-full h-full object-contain" />
          )
        )}
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize"
          onMouseDown={handleResizeMouseDown}
        >
          <FiMaximize className="w-3 h-3 text-white" />
        </div>
      </motion.div>
    );
  };

  const PageDropZone = ({ page }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: 'SIGNATURE',
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const itemId = item.id;
        const field = signatureFields.find(f => f.id === itemId);
        
        if (field && delta) {
          handleMoveSignature(
            itemId, 
            Math.max(0, field.x + delta.x), 
            Math.max(0, field.y + delta.y)
          );
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));

    return (
      <div
        ref={drop}
        className={`w-full h-full ${isOver ? 'bg-blue-50' : 'bg-transparent'} transition-colors duration-200`}
        onClick={(e) => handleAddSignatureField(e, page)}
      >
        <AnimatePresence>
          {signatureFields
            .filter(field => field.page === page)
            .map(field => (
              <SignatureField 
                key={field.id} 
                id={field.id}
                x={field.x}
                y={field.y}
                width={field.width}
                height={field.height}
                type={field.type}
                font={field.font}
                size={field.size}
              />
            ))}
        </AnimatePresence>
      </div>
    );
  };

  // Effect to check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/verify')
        .then(response => {
          setUser(response.data.user);
          setIsAuthenticated(true);
          fetchDocuments();
        })
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-full max-w-md"
        >
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-500 p-3 rounded-full">
                <FiUser className="text-white text-2xl" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-white mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-center text-blue-200 mb-8">
              {authMode === 'login' ? 'Sign in to your account' : 'Join us to start signing documents'}
            </p>
            
            <form onSubmit={handleAuth}>
              {authMode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-blue-300" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      required
                      className="w-full pl-10 pr-3 py-3 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </motion.div>
              )}
              
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-blue-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="w-full pl-10 pr-3 py-3 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-blue-300" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-3 py-3 bg-white bg-opacity-10 border border-blue-300 border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-blue-200 hover:text-white text-sm font-medium transition duration-300"
              >
                {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-72 bg-white shadow-lg flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">SignPDF</h1>
            <p className="text-sm text-gray-500 mt-1">Your professional eSign tool</p>
          </div>
          
          <div className="p-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mb-6"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <FiUpload className="mr-2" />
                {isLoading ? 'Uploading...' : 'Upload PDF'}
              </button>
            </motion.div>
            
            <div 
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={handleDrop}
              className={`mb-6 p-4 border-2 border-dashed rounded-lg text-center transition-all duration-300 ${isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
            >
              <FiUpload className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">or drop PDF here</p>
            </div>
            
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">My Documents</h3>
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {documents.map(doc => (
                <motion.div
                  key={doc.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${selectedDocument?.id === doc.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
                  onClick={async () => {
                    setSelectedDocument(doc);
                    setPdfFile(doc);
                    try {
                      const response = await api.get(`/documents/${doc.id}`);
                      setPdfDimensions({
                        width: response.data.data.width,
                        height: response.data.data.height
                      });
                      const fieldsResponse = await api.get(`/documents/${doc.id}/fields`);
                      setSignatureFields(fieldsResponse.data.data || []);
                      addNotification('Document loaded successfully', 'success');
                    } catch (error) {
                      //addNotification('Failed to load document details', 'error');
                    }
                  }}
                >
                  <div className="font-medium text-gray-800 truncate">{doc.original_name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
              
              {documents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-gray-400"
                >
                  <p>No documents yet</p>
                  <p className="text-sm mt-1">Upload your first PDF</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm z-10">
            <div className="px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {pdfFile ? pdfFile.original_name : 'Select a document'}
              </h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <FiUser className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          {/* PDF Viewer Area */}
          <main className="flex-1 bg-gray-50 p-6 overflow-auto">
            {pdfFile ? (
              <ErrorBoundary
                fallback={
                  <div className="p-8 text-center text-red-500">
                    Failed to load document. Please try again.
                  </div>
                }
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
                >
                  {/* Toolbar */}
                  <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-700">Signing Tools</h3>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${signatureMode === 'draw' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                          onClick={() => setSignatureMode('draw')}
                        >
                          <FiImage />
                          <span>Draw</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${signatureMode === 'type' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                          onClick={() => setSignatureMode('type')}
                        >
                          <FiType />
                          <span>Type</span>
                        </motion.button>
                        
                        {signatureFields.length > 0 && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center space-x-2"
                            onClick={handleFinalizeSignature}
                            disabled={isLoading}
                          >
                            <FiDownload />
                            <span>{isLoading ? 'Processing...' : 'Finalize'}</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* PDF Container */}
                  <div 
                    ref={pdfContainerRef}
                    className="flex-1 relative overflow-auto"
                    style={{
                      background: '#f0f0f0',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {pdfFile && (
                      <div style={{ position: 'relative', margin: '20px' }}>
                        <iframe
                          src={`${pdfFile.public_url}#toolbar=0&navpanes=0&scrollbar=0`}
                          className="border border-gray-300 shadow-lg"
                          style={{
                            width: '800px',
                            height: '1100px'
                          }}
                          title="Document Preview"
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: signatureMode ? 'auto' : 'none'
                          }}
                        >
                          <PageDropZone page={1} />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </ErrorBoundary>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-lg p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="max-w-md">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-full inline-block mb-6">
                    <FiUpload className="text-blue-500 text-4xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No document selected</h3>
                  <p className="text-gray-500 mb-6">Upload a new PDF or select an existing one to start signing</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fileInputRef.current.click()}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Select PDF File
                  </motion.button>
                </div>
              </motion.div>
            )}
          </main>
        </div>
        
        {/* Signature Modal */}
        <AnimatePresence>
          {showSignatureModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowSignatureModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {signatureMode === 'draw' ? 'Draw Your Signature' : 'Type Your Signature'}
                </h3>
                
                {signatureMode === 'draw' ? (
                  <div className="space-y-4">
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                      <canvas
                        ref={canvasRef}
                        width={500}
                        height={200}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="w-full border border-gray-300 cursor-crosshair bg-white"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={clearCanvas}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Clear
                      </button>
                      <button
                        onClick={saveDrawing}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Save Signature
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={signatureText}
                      onChange={(e) => setSignatureText(e.target.value)}
                      placeholder="Type your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
                        <select
                          value={signatureFont}
                          onChange={(e) => setSignatureFont(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          {fontOptions.map(font => (
                            <option key={font.value} value={font.value}>{font.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size: {signatureSize}px</label>
                        <input
                          type="range"
                          min="10"
                          max="30"
                          value={signatureSize}
                          onChange={(e) => setSignatureSize(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p 
                        className="text-center font-bold text-blue-600"
                        style={{ 
                          fontFamily: signatureFont,
                          fontSize: `${signatureSize}px`
                        }}
                      >
                        {signatureText || 'Preview'}
                      </p>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSignatureModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setShowSignatureModal(false);
                          addNotification('Signature added! Drag to position', 'success');
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Confirm
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notifications */}
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-3 rounded-lg shadow-lg flex items-center ${notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`}
              >
                {notification.type === 'error' ? (
                  <FiX className="mr-2" />
                ) : (
                  <FiCheck className="mr-2" />
                )}
                <span>{notification.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;