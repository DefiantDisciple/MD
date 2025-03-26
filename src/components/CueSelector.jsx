import React, { useState } from "react";

const cueGroups = [
    {
        name: "Worship Leader",
        cues: ["WL 1", "WL 2"],
        header: "bg-indigo-200 hover:bg-indigo-300",
        bg: "bg-indigo-100",
    },
    {
        name: "Vocals",
        cues: ["BV's Unison", "BV's Harmony", "Vocals Only"],
        header: "bg-pink-200 hover:bg-pink-300",
        bg: "bg-pink-100",
    },
    {
        name: "Instruments",
        cues: [
            "Keys & Pad",
            "Bass",
            "Drums",
            "Drums Only",
            "EG",
            "Full Band",
        ],
        header: "bg-sky-200 hover:bg-sky-300",
        bg: "bg-sky-100",
    },
    {
        name: "Grooves & Builds",
        cues: [
            "Groove",
            "Build",
            "Toms",
            "Steady Kick",
            "Double Time",
        ],
        header: "bg-yellow-200 hover:bg-yellow-300",
        bg: "bg-yellow-100",
    },
    {
        name: "Dynamics",
        cues: [
            "Drop Lows",
            "Drop Highs",
            "Take It Down",
            "Mellow",
            "HITS",
            "Choke",
            "Ritard",
            "Modulate",
        ],
        header: "bg-green-200 hover:bg-green-300",
        bg: "bg-green-100",
    },
    {
        name: "Custom",
        cues: ["Write Cue"],
        header: "bg-gray-200 hover:bg-gray-300",
        bg: "bg-gray-100",
    },
];

const CueSelector = ({ onCueSelect }) => {
    const [openGroup, setOpenGroup] = useState(null);

    const toggleGroup = (name) => {
        setOpenGroup((prev) => (prev === name ? null : name));
    };

    return (
        <div className="space-y-4">
            {cueGroups.map(({ name, cues, header, bg }) => (
                <div key={name} className="border border-gray-300 rounded-md overflow-hidden">
                    <button
                        onClick={() => toggleGroup(name)}
                        className={`w-full text-left px-4 py-3 font-semibold transition ${header}`}
                    >
                        {name}
                    </button>

                    {openGroup === name && (
                        <div className={`p-3 flex flex-wrap gap-2 ${bg}`}>
                            {cues.map((cue) => (
                                <button
                                    key={cue}
                                    onClick={() => onCueSelect(cue)}
                                    className="px-4 py-2 bg-white border rounded-xl hover:bg-gray-100 transition"
                                >
                                    {cue}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CueSelector;
