export class FirstRun {
  private prefix = 'better-bibtex-first-run-'
  private params: { citekeyFormat: string, dragndrop: boolean }
  private globals: Record<string, any>

  public load(): void {
    const wizard = this.globals.document.getElementById('better-bibtex-first-run')
    const cancel = wizard.getButton('cancel')
    cancel.disabled = true

    this.params = this.globals.window.arguments[0].wrappedJSObject

    for (const radiogroup of [...this.globals.document.getElementsByTagName('radiogroup')]) {
      const option = radiogroup.id.substring(this.prefix.length)
      for (const radio of [...radiogroup.getElementsByTagName('radio')]) {
        if (radio.value === this.params[option]) radiogroup.selectedItem = radio
      }
    }

    for (const checkbox of [...this.globals.document.getElementsByTagName('checkbox')]) {
      const option = checkbox.id.substring(this.prefix.length)
      checkbox.checked = !!this.params[option]
    }
  }

  public update(): void {
    for (const radiogroup of [...this.globals.document.getElementsByTagName('radiogroup')]) {
      const option = radiogroup.id.substring(this.prefix.length)
      this.params[option] = radiogroup.selectedItem.value
    }

    for (const checkbox of [...this.globals.document.getElementsByTagName('checkbox')]) {
      const option = checkbox.id.substring(this.prefix.length)
      this.params[option] = checkbox.checked
    }

    // special case for dynamic explanation
    const selected = this.globals.document.getElementById('better-bibtex-first-run-citekeyFormat').selectedItem.value
    for (const format of this.globals.document.querySelectorAll('#better-bibtex-first-run-citekeyFormat radio')) {
      this.globals.document.getElementById(`better-bibtex-first-run-citekeyFormat-${format.value}`).setAttribute('hidden', format.value !== selected)
    }
  }
}
