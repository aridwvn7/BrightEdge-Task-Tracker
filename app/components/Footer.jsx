
"use client";

import { ArrowUp } from "lucide-react";

const Footer = () => {
    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="mt-10 border-t border-slate-200 px-4 py-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
                <p>
                    Developed by
                    <span className="font-semibold text-green-600">
                        RAVD Tech
                    </span>
                </p>

                <button
                    onClick={backToTop}
                    title="Back to top"
                    aria-label="Back to top"
                    className="fixed bottom-6 right-6 z-50 rounded-full bg-green-600 p-1 text-white"
                >
                    <ArrowUp size={25} />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
