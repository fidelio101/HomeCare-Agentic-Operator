import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API for AI Agent data
  app.get("/api/agents/status", (req, res) => {
    res.json([
      { id: "marketing", name: "Marketing Agent", status: "active", tasksCompleted: 124, activeCampaigns: 3, efficiency: 98 },
      { id: "sales", name: "Sales Agent", status: "active", leadsContacted: 45, appointmentsBooked: 8, conversionRate: 18 },
      { id: "hr", name: "HR Agent", status: "processing", applicantsScreened: 89, checksPending: 5, timeToHire: "4.2 days" },
      { id: "ops", name: "Operations Agent", status: "idle", shiftsScheduled: 312, payrollProcessed: true, billingStatus: "current" },
    ]);
  });

  app.get("/api/ceo/approvals", (req, res) => {
    res.json([
      { id: 1, type: "Hiring", title: "Approve Caregiver: Sarah J.", priority: "high", timestamp: new Date() },
      { id: 2, type: "Billing", title: "Quarterly Invoice Review - Smith Family", priority: "medium", timestamp: new Date() },
      { id: 3, type: "Sales", title: "New Lead Multi-Service Quote Approval", priority: "low", timestamp: new Date() },
    ]);
  });

  app.get("/api/partnerships", (req, res) => {
    res.json({
      partners: [
        { id: "p1", name: "Sterling Wealth Partners", type: "Wealth Advisor", status: "meeting_scheduled", lastActivity: "2h ago", contactPerson: "Jonathan Sterling", potentialValue: "Ultra High" },
        { id: "p2", name: "City Hospital Discharge Unit", type: "Discharge Planner", status: "outreach_sent", lastActivity: "1d ago", contactPerson: "Sarah Miller", potentialValue: "High" },
        { id: "p3", name: "Elder Law Associates", type: "Attorney", status: "responded", lastActivity: "4h ago", contactPerson: "Robert Vance", potentialValue: "High" },
        { id: "p4", name: "The Rothschild Family Office", type: "Family Office", status: "cold", lastActivity: "Initial Lead", contactPerson: "Evelyn Ross", potentialValue: "Ultra High" },
        { id: "p5", name: "Oakwood Retirement Wealth", type: "Retirement Planner", status: "partnered", lastActivity: "3d ago", contactPerson: "Marcus Thorne", potentialValue: "High" },
        { id: "p6", name: "Elite Care Consultations", type: "Geriatric Care Manager", status: "meeting_scheduled", lastActivity: "1h ago", contactPerson: "Dr. Linda Gray", potentialValue: "Ultra High" },
      ],
      campaigns: [
        { id: "c1", targetType: "Wealth Advisors", delivered: 145, opened: 89, replied: 12, meetingsSet: 4 },
        { id: "c2", targetType: "Elder Law Attorneys", delivered: 98, opened: 54, replied: 7, meetingsSet: 2 },
        { id: "c3", targetType: "Discharge Planners", delivered: 210, opened: 120, replied: 18, meetingsSet: 5 },
        { id: "c4", targetType: "Geriatric Care Managers", delivered: 124, opened: 92, replied: 24, meetingsSet: 9 },
      ]
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
