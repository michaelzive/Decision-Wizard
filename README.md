# Angular Dynamic Decision Wizard

A dynamic wizard component for Angular that guides users through a decision tree of questions — with branching logic, async validations, route summaries, and a polished Material UI.

This project is ideal for building guided workflows, onboarding flows, form-based diagnostics, or decision engines.


---


## ✨ Features

- 🔄 **Dynamic Form Rendering** using [ngx-formly](https://formly.dev)
- 🔀 **Rule-based branching logic** using expressions (`expr-eval`)
- 🔐 **Locked step editing** to prevent broken or circular paths
- 🧭 **Live route summary** with decision history
- ⚙️ **Reactive state engine** with path tracking

---

## 📸 Preview

![image](https://github.com/user-attachments/assets/15ae8484-1bfd-4d39-ba98-5d67679ac622)

### 📁 Project Structure

| Path | Description |
|------|-------------|
| `src/app/decision-wizard/components/` | Wizard + Step form + Summary components |
| `src/app/decision-wizard/services/` | Handles the decision flow and branching |
| `src/app/decision-wizard/models/` | Typed interfaces for the decision tree |
| `src/app/decision-wizard/utils/` | Helpers and custom validators |
| `src/assets/decision-tree.json` | The rules and form config in JSON |


### MIT License

MIT License — free to use, modify, and share.
Authored with by Michael Zive
