// 🔄 SongArrangement.js with fixed function declarations for Netlify/ESLint
import React, { useState } from "react";
import CueSelector from "./components/CueSelector";
import SongPartSelector from "./components/SongPartSelector";

const SongArrangement = () => {
    const [cueSheets, setCueSheets] = useState([
        {
            title: "",
            bpm: "",
            activePart: null,
            data: {},
            history: [],
        },
    ]);

    const updateCueSheet = (index, updateFn) => {
        setCueSheets((prev) => {
            const updated = [...prev];
            updated[index] = updateFn({ ...updated[index] });
            return updated;
        });
    };

    const handleAddCue = (index, cue) => {
        updateCueSheet(index, (sheet) => {
            const part = sheet.activePart;
            if (!part) return sheet;
            const lines = sheet.data[part] || [[]];
            const updatedLines = [...lines];
            const lastLine = [...(updatedLines[updatedLines.length - 1] || [])];
            if (lastLine[lastLine.length - 1] === cue) return sheet;
            lastLine.push(cue);
            updatedLines[updatedLines.length - 1] = lastLine;
            sheet.data[part] = updatedLines;
            sheet.history.push({ type: "add-cue", part });
            return sheet;
        });
    };

    const handleNextLine = (index) => {
        updateCueSheet(index, (sheet) => {
            const part = sheet.activePart;
            if (!part) return sheet;
            sheet.data[part] = [...(sheet.data[part] || []), []];
            sheet.history.push({ type: "next-line", part });
            return sheet;
        });
    };

    const handleUndo = (index) => {
        updateCueSheet(index, (sheet) => {
            const lastAction = sheet.history.pop();
            if (!lastAction) return sheet;
            const lines = [...(sheet.data[lastAction.part] || [])];
            if (lastAction.type === "add-cue") {
                const lastLine = [...lines[lines.length - 1]];
                lastLine.pop();
                lines[lines.length - 1] = lastLine;
                if (lastLine.length === 0 && lines.length > 1) lines.pop();
            } else if (lastAction.type === "next-line") {
                if (lines.length > 1) lines.pop();
            } else if (lastAction.type === "add-part") {
                delete sheet.data[lastAction.part];
                sheet.activePart = null;
                return sheet;
            }
            sheet.data[lastAction.part] = lines;
            return sheet;
        });
    };

    const handleTransition = () => {
        setCueSheets((prev) => [
            ...prev,
            {
                title: "",
                bpm: "",
                activePart: null,
                data: {},
                history: [],
            },
        ]);
    };

    const handleExport = () => {
        let content = "";

        for (let i = 0; i < cueSheets.length; i++) {
            const sheet = cueSheets[i];
            content += `Song ${i + 1}\nTitle: ${sheet.title}\nBPM: ${sheet.bpm}\n\n`;

            for (const [part, lines] of Object.entries(sheet.data)) {
                content += `**${part}**\n`;
                for (const line of lines) {
                    if (line.length > 0) {
                        content += `- ${line.join(", ")}\n`;
                    }
                }
                content += "\n";
            }

            if (i !== cueSheets.length - 1) {
                content += "\n--------------------------\n\n";
            }
        }

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `cue-sheet.txt`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };


    return (
        <div className="p-6 max-w-7xl mx-auto pb-32">
            {cueSheets.map((sheet, index) => {
                const handleSelectPart = (part) => {
                    updateCueSheet(index, (s) => {
                        if (!s.data[part]) {
                            s.data[part] = [[]];
                            s.history.push({ type: "add-part", part });
                        }
                        s.activePart = part;
                        return s;
                    });
                };

                const handleCueClick = (cue) => {
                    handleAddCue(index, cue);
                };

                return (
                    <div key={index} className="mb-10">
                        <h1 className="text-2xl font-bold mb-4">Cue Sheet #{index + 1}</h1>

                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <label className="block font-medium mb-1">🎵 Song Title</label>
                                <input
                                    type="text"
                                    value={sheet.title}
                                    onChange={(e) =>
                                        updateCueSheet(index, (s) => ({ ...s, title: e.target.value }))
                                    }
                                    placeholder="e.g. Great Are You Lord"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div style={{ width: "120px" }}>
                                <label className="block font-medium mb-1">🎚️ BPM</label>
                                <input
                                    type="number"
                                    value={sheet.bpm}
                                    onChange={(e) =>
                                        updateCueSheet(index, (s) => ({ ...s, bpm: e.target.value }))
                                    }
                                    placeholder="e.g. 72"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/2">
                                {index === cueSheets.length - 1 && (
                                    <>
                                        <SongPartSelector
                                            activePart={sheet.activePart}
                                            onSelectPart={handleSelectPart}
                                        />
                                        <CueSelector onCueSelect={handleCueClick} />
                                    </>
                                )}
                            </div>

                            <div className="md:w-1/2 max-h-[400px] overflow-y-auto pr-2">
                                <h2 className="text-lg font-semibold mb-2">📋 Cue Sheet:</h2>
                                {Object.entries(sheet.data).map(([part, lines]) => (
                                    <div key={part} className="mb-4">
                                        <h3 className="font-bold text-md mb-1">{part}</h3>
                                        {lines.map((line, idx) => (
                                            <p key={idx} className="text-sm text-gray-800 ml-2">
                                                {line.length > 0 ? `- ${line.join(", ")}` : ""}
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow p-4 flex flex-wrap justify-center gap-4 z-50">
                <button
                    onClick={() => handleUndo(cueSheets.length - 1)}
                    className="px-4 py-2 rounded bg-red-100 hover:bg-red-200 text-red-800 font-semibold"
                >
                    Undo
                </button>
                <button
                    onClick={() => handleNextLine(cueSheets.length - 1)}
                    className="px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold"
                >
                    Next Line
                </button>
                <button
                    onClick={handleTransition}
                    className="px-4 py-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold"
                >
                    TRANSITION
                </button>
                <button
                    onClick={handleExport}
                    className="px-4 py-2 rounded bg-green-100 hover:bg-green-200 text-green-800 font-semibold"
                >
                    Export
                </button>
            </div>
        </div>
    );
};

export default SongArrangement;
