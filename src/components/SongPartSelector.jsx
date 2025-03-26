import React from "react";

const songParts = [
    "Intro",
    "Verse 1",
    "Verse 2",
    "Pre Chorus",
    "Chorus",
    "Verse 3",
    "Verse 4",
    "Interlude",
    "Bridge",
    "Tag",
    "Vamp",
];

const SongPartSelector = ({ onSelectPart, activePart }) => {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">🎼 Song Parts:</h2>
            <div className="flex flex-wrap gap-2">
                {songParts.map((part) => (
                    <button
                        key={part}
                        onClick={() => onSelectPart(part)}
                        className={`px-4 py-2 rounded-xl transition ${activePart === part
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {part}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SongPartSelector;
