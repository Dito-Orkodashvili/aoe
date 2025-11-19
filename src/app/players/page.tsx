export default function PlayersPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>Players</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {/* Replace these with your real images later */}
        <img src="/players/p1.jpg" style={{ width: "100%", borderRadius: "8px" }} />
        <img src="/players/p2.jpg" style={{ width: "100%", borderRadius: "8px" }} />
        <img src="/players/p3.jpg" style={{ width: "100%", borderRadius: "8px" }} />

        <img src="/players/p4.jpg" style={{ width: "100%", borderRadius: "8px" }} />
        <img src="/players/p5.jpg" style={{ width: "100%", borderRadius: "8px" }} />
        <img src="/players/p6.jpg" style={{ width: "100%", borderRadius: "8px" }} />
      </div>
    </main>
  );
}
