import { addTicket } from "@/utils/ServerActions"
import SubmitButton from "../SubmitButton/SubmitButton"

export default function CreateForm() {
  return (
    <form action={ addTicket } className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required 
          name="title"
          type="text"
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          name="body"
          required
        />
      </label>
      <label>
        <span>Priority:</span>
        <select name="priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <SubmitButton />
    </form>
  )
}