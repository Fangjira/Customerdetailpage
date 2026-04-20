import React from "react";

export default function LeadDetailScreenV2Simple({ onBack, leadId }) {
  console.log('[LeadDetailScreenV2Simple] Rendering with leadId:', leadId);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold">Lead Detail Screen V2</h1>
      <p>Lead ID: {leadId || 'No ID'}</p>
      <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go Back
      </button>
    </div>
  );
}

export { LeadDetailScreenV2Simple as LeadDetailScreenV2 };
