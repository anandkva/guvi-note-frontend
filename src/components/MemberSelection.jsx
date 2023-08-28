import React from 'react';

const MemberSelection = ({ members, selectedMembers, handleMemberSelection }) => {
  const toggleMemberSelection = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      handleMemberSelection(selectedMembers.filter((id) => id !== memberId));
    } else {
      handleMemberSelection([...selectedMembers, memberId]);
    }
  };

  return (
    <div className="mb-4 overflow-y-scroll max-h-40">
      <label className="block text-sm font-medium text-gray-700">
        Select Members
      </label>
      <div className="space-y-2">
        {members.map((member) => (
          <label key={member._id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedMembers.includes(member._id)}
              onChange={() => toggleMemberSelection(member._id)}
              className="mr-2"
            />
            {member.username}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MemberSelection;
