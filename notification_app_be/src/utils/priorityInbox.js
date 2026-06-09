function getPriorityNotifications(
    notifications,
    topN = 10
  ) {
    const weights = {
      Placement: 3,
      Result: 2,
      Event: 1,
    };
  
    return notifications
      .map((item) => {
        const timestamp =
          new Date(
            item.Timestamp ||
            item.timestamp ||
            item.createdAt
          ).getTime();
  
        const age =
          Date.now() - timestamp;
  
        return {
          ...item,
          score:
            (weights[item.Type || item.type] || 1) *
              100000000 -
            age,
        };
      })
      .sort(
        (a, b) =>
          b.score - a.score
      )
      .slice(0, topN);
  }
  
  module.exports =
    getPriorityNotifications;