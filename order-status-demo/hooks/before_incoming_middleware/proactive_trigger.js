
  async function hook() {
    if (event.type === 'proactive-trigger') {
      // Identifying if the session is new
      if (!event.state.session.proactive_triggered) {
        event.state.session.proactive_triggered = true
      } else {
        event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
      }
    }
  }

  return hook()