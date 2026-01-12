import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface ShareQRProps {
    url: string;
    title?: string;
    description?: string;
}

export const ShareQR: React.FC<ShareQRProps> = ({
    url,
    title = "Share your profile",
    description = "Scan this QR code to view the digital profile."
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 text-center mb-6 text-sm">
                {description}
            </p>

            <div className="p-4 bg-white border-2 border-slate-100 rounded-xl shadow-sm">
                <QRCodeCanvas
                    value={url}
                    size={200}
                    level={"H"}
                    includeMargin={true}
                    imageSettings={{
                        src: "/favicon.ico", // Assuming there is a favicon, or we can omit this
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        excavate: true,
                    }}
                />
            </div>

            <div className="mt-6 w-full">
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <input
                        type="text"
                        readOnly
                        value={url}
                        className="flex-1 bg-transparent text-sm text-slate-600 outline-none w-full"
                    />
                    <button
                        onClick={() => navigator.clipboard.writeText(url)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};
