import React from 'react';

function TurnList({ turnOrders }: { turnOrders: any[] }) {
  return (
    <div>
      <h3>Turn List</h3>
      <ul>
        {turnOrders.map((turn, index) => (
          <li key={index}>
            Mob ID: {turn.mobId}, Turn Index: {turn.turnIndex}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TurnList;
