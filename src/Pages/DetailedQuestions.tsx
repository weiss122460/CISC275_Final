import React, { useState } from "react";
import { Button } from "react-bootstrap"

export function DetailedQuestions(): React.JSX.Element {
    

    return <div>

        <Button onClick={() => window.location.href= '/BasicQuestions'}>Basic Questions</Button>

    </div>
}