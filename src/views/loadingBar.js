import React, { PureComponent } from "react";

class LoadingBar extends PureComponent {
    render() {
        return (
            <tr>
                <td colSpan="9">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default LoadingBar;