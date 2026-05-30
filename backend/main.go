package main

import (
	"encoding/json"
	"fmt"      // formatting and printing values to the console.
	"log"      // logging messages to the console.
	"net/http" // Used for build HTTP servers and clients.
	"os"
	"strconv"
	"strings"
	"time"
)

type Activity struct {
	ID          int      `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Category    string   `json:"category"`
	Location    string   `json:"location"`
	Tags        []string `json:"tags"`
}

// Port we listen on.
const portNum string = ":8080"

type statusRecorder struct {
	http.ResponseWriter
	statusCode int
}

func (r *statusRecorder) WriteHeader(statusCode int) {
	r.statusCode = statusCode
	r.ResponseWriter.WriteHeader(statusCode)
}

func logRequests(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		recorder := &statusRecorder{
			ResponseWriter: w,
			statusCode:     http.StatusOK,
		}

		start := time.Now()

		next(recorder, r)

		log.Printf(
			"%s %s -> %d (%s)",
			r.Method,
			r.URL.Path,
			recorder.statusCode,
			time.Since(start),
		)
	}
}

func loadActivities() ([]Activity, error) {
	data, err := os.ReadFile("testdata/activities.json") // read file
	if err != nil {
		return nil, err
	}
	var activities []Activity
	err = json.Unmarshal(data, &activities)
	if err != nil {
		return nil, err
	}
	return activities, nil
}

func findActivityByID(id int, activities []Activity) (Activity, bool) {
	for _, activity := range activities {
		if activity.ID == id {
			return activity, true
		}
	}
	return Activity{}, false
}

func writeJSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, statusCode int, message string) {
	writeJSON(w, statusCode, map[string]string{
		"error": message,
	})
}

// Handler functions.
func Home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage")
}

func Info(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Info page")
}

func Activities(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	activities, err := loadActivities()
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not load activities")
		return
	}

	writeJSON(w, http.StatusOK, activities)
}

func ActivityByID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	idText := strings.TrimPrefix(r.URL.Path, "/api/activities/")

	id, err := strconv.Atoi(idText)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid activity id")
		return
	}

	activities, err := loadActivities()
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not load activities")
		return
	}

	activity, found := findActivityByID(id, activities)
	if !found {
		writeError(w, http.StatusNotFound, "activity not found")
		return
	}

	writeJSON(w, http.StatusOK, activity)
}

func Health(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func main() {
	log.Println("Starting our simple http server.")

	// Registering our handler functions, and creating paths.
	http.HandleFunc("/", logRequests(Home))
	http.HandleFunc("/info", logRequests(Info))
	http.HandleFunc("/api/health", logRequests(Health))
	http.HandleFunc("/api/activities", logRequests(Activities))
	http.HandleFunc("/api/activities/", logRequests(ActivityByID))

	log.Println("Started on port", portNum)
	fmt.Println("To close connection CTRL+C :-)")

	// Spinning up the server.
	err := http.ListenAndServe(portNum, nil)
	if err != nil {
		log.Fatal(err)
	}
}
