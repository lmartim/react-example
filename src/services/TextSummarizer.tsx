import React from 'react';

function TextSummarizer(text) {
    if (text.length <= 250)
        return text

    return `${text.slice(0, 250)}...`
}

export default TextSummarizer