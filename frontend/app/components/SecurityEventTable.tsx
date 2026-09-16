'use client'
export default function SecurityEventTable() {
    return (
        <>
            <div>
                <table className="border">
                    <thead className="border gap-4">
                        <tr>
                            <th>Timestamp</th>
                            <th>Attack Type</th>
                            <th>Risk Score</th>
                            <th>Decision</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10:15</td>
                            <td>Lol</td>
                            <td>Lol</td>
                            <td>Lol</td>
                            <td>Lol</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
};