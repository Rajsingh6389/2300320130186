import {
    Card,
    CardContent,
    Typography,
    Box
  } from "@mui/material";
  
  function NotificationCard({
    notification
  }) {
    return (
      <Card sx={{ mb: 1, boxShadow: 1 }}>
        <CardContent sx={{ py: 1, "&:last-child": { pb: 1 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold" }}
            >
              {notification.Type || notification.type}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              {new Date(notification.Timestamp || notification.timestamp).toLocaleString()}
            </Typography>
          </Box>
  
          <Typography variant="body2">
            {notification.Message || notification.message}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
  export default NotificationCard;