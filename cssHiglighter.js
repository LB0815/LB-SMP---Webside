document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("CSS-Code");
    if (!el) return;

    let css = el.textContent;

    const colors = {
        comment: "#6A9955",
        selector: "#FFD700",
        property: "#8CDCDA",
        value: "#C3916C",
        number: "#93CEA8",
        brace: "#FFD700",
        colon: "#FFFFFF",
        semicolon: "#FFFFFF"
    };

    const tokens = [];
    const regexList = [
        { type: "comment",   regex: /\/\*[\s\S]*?\*\//y },
        { type: "string",    regex: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/y },
        { type: "brace",     regex: /[{}\[\]]/y },
        { type: "colon",     regex: /:/y },
        { type: "semicolon", regex: /;/y },
        { type: "number",    regex: /[-+]?\d*\.?\d+(?:px|em|rem|vh|vw|%)?/y },
        { type: "color",     regex: /#[0-9A-Fa-f]{3,6}/y },
        { type: "rgb",       regex: /rgb\([^)]*\)/y },

        // Selektoren: jedes Wort, das später vor { steht
        { type: "selector", regex: /[.#]?[a-zA-Z0-9_\-\[\]=:"']+(?=\s*\{)/y },

        // Properties
        { type: "property",  regex: /[a-zA-Z-]+(?=\s*:)/y },

        // Fallback: Werte
        { type: "value",     regex: /[a-zA-Z_-]+/y }
    ];

    let i = 0;

    while (i < css.length) {
        let matched = false;

        for (const { type, regex } of regexList) {
            regex.lastIndex = i;
            const match = regex.exec(css);

            if (match) {
                let finalType = type;

                // Selektor nur, wenn später eine {
                if (type === "selector") {
                    const rest = css.slice(regex.lastIndex).trimStart();
                    if (!rest.startsWith("{")) finalType = "value";
                }

                // Strings, Farben, rgb → Werte
                if (type === "string" || type === "rgb" || type === "color") {
                    finalType = "value";
                }

                tokens.push({ type: finalType, value: match[0] });
                i += match[0].length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            tokens.push({ type: "text", value: css[i] });
            i++;
        }
    }

    const html = tokens
        .map(t => {
            if (t.type === "text") return t.value;
            const color = colors[t.type] || "#FFFFFF";
            return `<span style="color:${color}">${t.value}</span>`;
        })
        .join("");

    el.innerHTML = html;
});
