import React, { useState } from "react";
import { Button } from "react-bootstrap"

export function Homepage(): React.JSX.Element {
    

    return <div>

        <Button onClick={() => window.location.href= '/BasicQuestions'}>Basic Questions</Button>
        <Button onClick={() => window.location.href= '/DetailedQuestions'}>Detailed Questions</Button>

    </div>
}