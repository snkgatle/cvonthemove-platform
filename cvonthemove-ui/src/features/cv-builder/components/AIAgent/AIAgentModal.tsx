import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, X, Download, Save } from 'lucide-react';
import { type CreateCVInput } from '../../types';

interface AIAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDownload: (data: CreateCVInput) => void;
    onSave: (data: CreateCVInput) => void;
}

type MessageType = 'agent' | 'user';

interface Message {
    id: string;
    type: MessageType;
    text: string;
    isTyping?: boolean;
}

// Extended schema-guided state machine
type AgentState =
    | 'intro'
    | 'fullName'
    | 'email'
    | 'phone'
    | 'location'
    | 'summary'
    | 'address_intro'
    | 'address_city'
    | 'address_country'
    | 'education_intro'
    | 'education_degree'
    | 'education_institution'
    | 'education_year'
    | 'work_intro'
    | 'work_role'
    | 'work_company'
    | 'work_dates'
    | 'work_description'
    | 'skills'
    | 'references_intro'
    | 'reference_name'
    | 'reference_relationship'
    | 'completion'
    | 'finished';

export const AIAgentModal: React.FC<AIAgentModalProps> = ({ isOpen, onClose, onDownload, onSave }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [currentState, setCurrentState] = useState<AgentState>('intro');
    const [cvData, setCvData] = useState<Partial<CreateCVInput>>({
        personalDetails: { languages: ['English'], maritalStatus: 'Single', idNumber: 'N/A' } as any,
        addresses: [],
        educations: [],
        workExperiences: [],
        skills: [],
        references: []
    });

    // Temporary storage for current item being added
    const [tempData, setTempData] = useState<any>({});

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Start conversation
            addAgentMessage("Hello! I'm your AI CV Assistant. I can help you create a professional CV quickly. Shall we start? (Yes/No)");
        }
    }, [isOpen]);

    const addAgentMessage = (text: string) => {
        const id = Date.now().toString();
        setMessages((prev) => [...prev, { id, type: 'agent', text }]);
    };

    const addUserMessage = (text: string) => {
        const id = Date.now().toString();
        setMessages((prev) => [...prev, { id, type: 'user', text }]);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userText = inputValue.trim();
        addUserMessage(userText);
        setInputValue('');

        // Process response with a small delay to simulate thinking
        setTimeout(() => {
            processUserResponse(userText);
        }, 600);
    };

    const processUserResponse = (text: string) => {
        const lowerText = text.toLowerCase();

        switch (currentState) {
            case 'intro':
                if (lowerText.includes('yes') || lowerText.includes('sure') || lowerText.includes('ok')) {
                    addAgentMessage("Great! Let's start with your personal details. What is your full name?");
                    setCurrentState('fullName');
                } else {
                    addAgentMessage("No problem. Let me know when you're ready.");
                }
                break;

            case 'fullName':
                setCvData((prev: any) => ({
                    ...prev,
                    personalDetails: { ...prev.personalDetails, fullName: text }
                }));
                addAgentMessage(`Nice to meet you, ${text}. What is your email address?`);
                setCurrentState('email');
                break;

            case 'email':
                setCvData((prev: any) => ({
                    ...prev,
                    personalDetails: { ...prev.personalDetails, email: text }
                }));
                addAgentMessage("Got it. And your phone number?");
                setCurrentState('phone');
                break;

            case 'phone':
                 setCvData((prev: any) => ({
                    ...prev,
                    personalDetails: { ...prev.personalDetails, phone: text }
                }));
                addAgentMessage("Where are you located? (e.g., London, UK)");
                setCurrentState('location');
                break;

            case 'location':
                 setCvData((prev: any) => ({
                    ...prev,
                    personalDetails: { ...prev.personalDetails, location: text }
                }));
                addAgentMessage("Could you provide a brief professional summary about yourself?");
                setCurrentState('summary');
                break;

            case 'summary':
                 setCvData((prev: any) => ({
                    ...prev,
                    personalDetails: { ...prev.personalDetails, summary: text }
                }));
                addAgentMessage("Thanks. Now, let's add your address. Which city do you live in?");
                setCurrentState('address_city');
                break;

            case 'address_city':
                setTempData({ city: text });
                addAgentMessage("And which country?");
                setCurrentState('address_country');
                break;

            case 'address_country':
                const newAddress = {
                    line1: 'N/A', // Keeping N/A for Line 1 to simplify conversation
                    city: tempData.city,
                    postalCode: '0000', // Default
                    country: text
                };
                setCvData((prev: any) => ({
                    ...prev,
                    addresses: [newAddress]
                }));
                addAgentMessage("Address noted. Do you want to add an education/degree? (Yes/No)");
                setCurrentState('education_intro');
                break;

            case 'education_intro':
                if (lowerText.includes('yes')) {
                    addAgentMessage("What is the degree or qualification name?");
                    setCurrentState('education_degree');
                } else {
                    addAgentMessage("Okay, moving on to work experience. Do you have work experience to add? (Yes/No)");
                    setCurrentState('work_intro');
                }
                break;

            case 'education_degree':
                setTempData({ degree: text });
                addAgentMessage("Which institution did you attend?");
                setCurrentState('education_institution');
                break;

            case 'education_institution':
                setTempData((prev: any) => ({ ...prev, institution: text }));
                addAgentMessage("What year did you start? (YYYY-MM-DD or Year)");
                setCurrentState('education_year');
                break;

            case 'education_year':
                const newEducation = {
                    degree: tempData.degree,
                    institution: tempData.institution,
                    startDate: text,
                    fieldOfStudy: 'General',
                    current: false
                };
                setCvData((prev: any) => ({
                    ...prev,
                    educations: [...(prev.educations || []), newEducation]
                }));
                addAgentMessage("Education added. Do you want to add another one? (Yes/No)");
                setCurrentState('education_intro');
                break;

            case 'work_intro':
                if (lowerText.includes('yes')) {
                    addAgentMessage("What was your job title/position?");
                    setCurrentState('work_role');
                } else {
                    addAgentMessage("Okay. What are your top skills? (Comma separated, e.g., React, Node.js, Design)");
                    setCurrentState('skills');
                }
                break;

            case 'work_role':
                setTempData({ position: text });
                addAgentMessage("Which company was this for?");
                setCurrentState('work_company');
                break;

            case 'work_company':
                setTempData((prev: any) => ({ ...prev, company: text }));
                addAgentMessage("When did you start? (YYYY-MM-DD)");
                setCurrentState('work_dates');
                break;

            case 'work_dates':
                 setTempData((prev: any) => ({ ...prev, startDate: text }));
                 addAgentMessage("Please provide a brief description of your role.");
                 setCurrentState('work_description');
                 break;

            case 'work_description':
                const newWork = {
                    position: tempData.position,
                    company: tempData.company,
                    startDate: tempData.startDate,
                    description: text,
                    current: false
                };
                setCvData((prev: any) => ({
                    ...prev,
                    workExperiences: [...(prev.workExperiences || []), newWork]
                }));
                addAgentMessage("Work experience added. Do you want to add another? (Yes/No)");
                setCurrentState('work_intro');
                break;

            case 'skills':
                const skillsList = text.split(',').map(s => ({ name: s.trim(), level: 'Proficient' }));
                setCvData((prev: any) => ({
                    ...prev,
                    skills: skillsList
                }));
                addAgentMessage("Great. Finally, please provide one reference name.");
                setCurrentState('reference_name');
                break;

            case 'reference_name':
                 setTempData({ name: text });
                 addAgentMessage("What is their relationship to you? (e.g. Manager, Colleague)");
                 setCurrentState('reference_relationship');
                 break;

            case 'reference_relationship':
                const newRef = {
                    name: tempData.name,
                    relationship: text,
                    phone: 'N/A'
                };
                 setCvData((prev: any) => ({
                    ...prev,
                    references: [newRef]
                }));
                addAgentMessage("Excellent! I've gathered all the necessary information. Would you like to Download the PDF or Save it to your account?");
                setCurrentState('completion');
                break;

            case 'completion':
                if (lowerText.includes('download')) {
                    onDownload(cvData as CreateCVInput);
                    addAgentMessage("Downloading your CV...");
                    setCurrentState('finished');
                } else if (lowerText.includes('save')) {
                    onSave(cvData as CreateCVInput);
                    addAgentMessage("Redirecting to save...");
                    setCurrentState('finished');
                } else {
                    addAgentMessage("Please type 'Download' or 'Save'.");
                }
                break;

            case 'finished':
                addAgentMessage("Is there anything else I can help you with?");
                break;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-slate-800 border border-slate-700 w-full max-w-lg h-[600px] rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="bg-slate-900 p-4 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center gap-2 text-white">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <Bot size={18} />
                        </div>
                        <h3 className="font-semibold">AI CV Assistant</h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                    msg.type === 'user'
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-slate-700 text-slate-100 rounded-tl-none'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                    {currentState === 'completion' ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => processUserResponse('download')}
                                className="flex-1 btn-secondary bg-slate-700 hover:bg-slate-600 text-white py-2 rounded flex items-center justify-center gap-2"
                            >
                                <Download size={16} /> Download
                            </button>
                            <button
                                onClick={() => processUserResponse('save')}
                                className="flex-1 btn-primary bg-blue-600 hover:bg-blue-500 text-white py-2 rounded flex items-center justify-center gap-2"
                            >
                                <Save size={16} /> Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type your answer..."
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
