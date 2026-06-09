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
    Select,
    MenuItem,
    Button,
    CircularProgress,
    Alert,
    Box
  } from "@mui/material";
  
  function NotificationsPage() {
  
    const [notifications,
      setNotifications] =
      useState([]);
  
    const [type,
      setType] =
      useState("");
  
    const [page,
      setPage] =
      useState(1);
  
    const [loading,
      setLoading] =
      useState(false);
  
    const [error,
      setError] =
      useState(null);
  
    const fetchData =
      async () => {
        setLoading(true);
        setError(null);
        try {
          const response =
            await API.get(
              "/notifications",
              {
                params: {
                  page,
                  limit: 10,
                  notification_type:
                    type
                }
              }
            );
    
          setNotifications(
            response.data.notifications ||
            response.data
          );
        } catch (err) {
          setError(err.message || "Failed to fetch notifications");
        } finally {
          setLoading(false);
        }
      };
  
    useEffect(() => {
      fetchData();
    }, [page, type]);
  
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
  
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Notifications
        </Typography>
  
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography variant="body2">Filter:</Typography>
            <Select
              value={type}
              onChange={(e)=>
                setType(
                  e.target.value
                )
              }
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">
                All
              </MenuItem>
      
              <MenuItem value="Placement">
                Placement
              </MenuItem>
      
              <MenuItem value="Result">
                Result
              </MenuItem>
      
              <MenuItem value="Event">
                Event
              </MenuItem>
            </Select>
          </Box>
  
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={()=>
                setPage(
                  page-1
                )
              }
              disabled={
                page===1 || loading
              }
            >
              Prev
            </Button>
    
            <Typography variant="body2">
              Page {page}
            </Typography>
  
            <Button
              variant="outlined"
              size="small"
              onClick={()=>
                setPage(
                  page+1
                )
              }
              disabled={loading || notifications.length < 10}
            >
              Next
            </Button>
          </Box>
        </Box>
  
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={24} />
          </Box>
        )}
  
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
  
        {!loading && !error && notifications.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              No notifications found.
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
  
  export default NotificationsPage;