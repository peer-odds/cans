package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"strings"
)

var res string

type Todo struct {
	Title string
	Done  bool
}

type TodoPageData struct {
	PageTitle string
	Todos     []Todo
}

func numCheck(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var data string = string(body)
	cleanedInput := strings.ReplaceAll(data, "-", "")
	cleanedInput = strings.ReplaceAll(cleanedInput, " ", "")
	if cleanedInput[0] == '0' {
		if len(cleanedInput) > 3 && len(cleanedInput) <= 6 {
			fmt.Fprintf(w, "%s-%s", cleanedInput[:3], cleanedInput[3:])
		} else if len(cleanedInput) > 6 && len(cleanedInput) <= 10 {
			fmt.Fprintf(w, "%s-%s-%s", cleanedInput[:3], cleanedInput[3:6], cleanedInput[6:])
		} else {
			fmt.Fprintf(w, "%s", cleanedInput)
		}
	} else {
		if len(cleanedInput) > 2 && len(cleanedInput) <= 5 {
			fmt.Fprintf(w, "%s-%s", cleanedInput[:2], cleanedInput[2:])
		} else if len(cleanedInput) > 5 && len(cleanedInput) <= 9 {
			fmt.Fprintf(w, "%s-%s-%s", cleanedInput[:2], cleanedInput[2:5], cleanedInput[5:])
		} else {
			fmt.Fprintf(w, "%s", cleanedInput)
		}
	}
}
func main() {
	http.Handle("/CSS/", http.StripPrefix("/CSS", http.FileServer(http.Dir("CSS"))))
	http.Handle("/JS/", http.StripPrefix("/JS", http.FileServer(http.Dir("JS"))))
	tmpl := template.Must(template.ParseFiles("index.html"))
	http.HandleFunc("/get", numCheck)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")
		data := TodoPageData{
			PageTitle: "My TODO list",
			Todos: []Todo{
				{Title: "Task 1", Done: false},
				{Title: "Task 2", Done: true},
				{Title: "Task 3", Done: true},
			},
		}
		tmpl.Execute(w, data)
	})
	http.ListenAndServe(":8080", nil)

}
