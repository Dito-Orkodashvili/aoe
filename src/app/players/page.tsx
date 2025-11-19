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
        <img src="/players/Lucipher.png" style={{ width: "100%", borderRadius: "8px" }} />
        <img src="/players/guramata.png" style={{ width: "100%", borderRadius: "8px" }} />
        <img src="/players/sandriko.png" style={{ width: "100%", borderRadius: "8px" }} />

        <img src="/players/purple.png" style={{ width: "100%", borderRadius: "8px" }} />
        <img src="/players/valchoka.png" style={{ width: "100%", borderRadius: "8px" }} />
        <img src="/players/omerta.png" style={{ width: "100%", borderRadius: "8px" }} />
      </div>
    </main>
  );
}
