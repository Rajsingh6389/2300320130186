import {
    useEffect,
    useState,
    useCallback
  } from "react";
  
  import API from "../services/api";
  
  import NotificationCard
  from "../components/NotificationCard";
  
  import {
    Container,
    Typography,
    CircularProgress,
    Alert,
    Box
  } from "@mui/material";
  
  function PriorityInboxPage() {
  
    const [notifications,
      setNotifications] =
      useState([]);
  
    const [loading,
      setLoading] =
      useState(false);
  
    const [error,
      setError] =
      useState(null);
  
    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get("/notifications/priority");
        setNotifications(res.data.notifications || []);
      } catch (err) {
        setError(err.message || "Failed to fetch priority inbox");
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
  
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Priority Inbox
        </Typography>
  
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}
  
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}. Make sure the backend is running.
          </Alert>
        )}
  
        {!loading && !error && notifications.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8, bgcolor: "grey.50", borderRadius: 2 }}>
            <Typography color="text.secondary">
              No priority notifications found.
            </Typography>
          </Box>
        )}
  
        {!loading && !error && notifications.map(
          (notification,index)=>(
            <NotificationCard
              key={index}
              notification={
                notification
              }
            />
          )
        )}
  
      </Container>
    );
  }
  
  export default PriorityInboxPage;